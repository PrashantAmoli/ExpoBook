import { createContext, useContext, useReducer } from 'react';
import moviesReducer, { initialState } from './reducer';

const MoviesContext = createContext(initialState);

export const MoviesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(moviesReducer, initialState);

	// To append to currently displyed movies list
	// * moviesData = { fetchedPages, moviesList }
	const updateMoviesList = moviesData => dispatch({ type: 'UPDATE_MOVIES_LIST', payload: moviesData });

	// To create new movies list from popular|| search
	// * moviesData = { searchQuery, fetchedPages, totalPages, totalMovies, moviesList }
	const updateNewMoviesList = moviesData => dispatch({ type: 'NEW_MOVIES_LIST', payload: moviesData });

	const toggleSlot = slot => dispatch({ type: 'TOGGLE_SLOT', payload: slot });

	// state values and function provided to the components in this context
	const value = {
		...state,
		updateMoviesList,
		updateNewMoviesList,
		toggleSlot,
	};

	return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
};

const useMovies = () => {
	const context = useContext(MoviesContext);
	if (context === undefined) console.log('useMoviesContext must be used within a MoviesProvider');
	return context;
};

export default useMovies;
