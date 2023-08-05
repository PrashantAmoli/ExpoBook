export const initialState = {
	moviesList: [],
	searchQuery: '', // last executed searchQuery '' means Homepage/new & popular movies
	fetchedPages: 0, // to keep count of pages fetched
	totalPages: 0,
	totalMovies: 0,
	slots: [
		{
			slot: 'CE2',
			available: true,
		},
		{
			slot: 'CE3',
			available: true,
		},
		{
			slot: 'CE4',
			available: true,
		},
		{
			slot: 'CE5',
			available: true,
		},
		{
			slot: 'CE6',
			available: true,
		},
		{
			slot: 'CE7',
			available: false,
		},
		{
			slot: 'CE8',
			available: true,
		},
		{
			slot: 'CE9',
			available: false,
		},
		{
			slot: 'KG',
			available: true,
		},
		{
			slot: 'KH',
			available: false,
		},
		{
			slot: 'KJ',
			available: true,
		},
		{
			slot: 'KK',
			available: true,
		},
		{
			slot: 'KL',
			available: true,
		},
		{
			slot: 'KM',
			available: false,
		},
		{
			slot: 'KN',
			available: true,
		},
	],
}; // * API returns <=20 videos per page

const moviesReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_MOVIES_LIST':
			// { fetchedPages, moviesList[] }
			const { moviesList: newMoviesList } = action.payload; // Obj. Destructuring with alias
			const IDs = new Set(state.moviesList.map(movie => movie.id));
			// filtering out movies without poster (better UI) and create a union without duplicates
			const newMovies = [...newMoviesList.filter(movie => !IDs.has(movie.id) && movie.poster_path)];
			// todo implement some solution for movies without poster
			return {
				...state,
				fetchedPages: action.payload.fetchedPages,
				moviesList: [...state.moviesList, ...newMovies],
			};

		case 'NEW_MOVIES_LIST':
			// { fetchedPages, moviesList[] }
			const { fetchedPages, searchQuery, totalMovies, totalPages, moviesList } = action.payload;
			// Remove old movies and add new movies only
			return {
				...state,
				searchQuery,
				fetchedPages,
				totalPages,
				totalMovies,
				// filtering out movies without poster
				moviesList: [...moviesList.filter(movie => movie.poster_path)],
			};

		case 'TOGGLE_SLOT':
			const { slot } = action.payload;
			// toggle availability of slot with given slot name
			const slots = state.slots.map(s => (s.slot === slot ? { ...s, available: !s.available } : s));
			return {
				slots,
			};

		default:
			return state;
	}
};

export default moviesReducer;
