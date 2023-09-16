import { Editor } from 'novel';
import { useEffect, useState } from 'react';

export const NovelEditor = props => {
	const [content, setContent] = useState(null);

	useEffect(() => {
		if (content) {
			const data = localStorage.getItem('novel__content');
			console.log(data);
		}
	}, [content]);

	return (
		<>
			<Editor
				className="mx-auto border rounded shadow"
				editable={false}
				defaultValue={{}}
				onDebouncedUpdate={editor => {
					console.log(editor);
					setContent(editor);
				}}
			/>
		</>
	);
};

export default NovelEditor;
