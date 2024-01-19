import { useState, type FormEvent } from "react";

const SearchField = () => {
	const [query, setQuery] = useState("");
	const [mode, setMode] = useState("user");

	const onModeChange = (event: FormEvent<HTMLSelectElement>) => {
		event.preventDefault();
		// @ts-expect-error value exists
		setMode(event.target.value);
	};

	const onQueryChange = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		// @ts-expect-error value exists
		setQuery(event.target.value);
	};

	const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log("submitted");
	};

	return (
		<div className="flex justify-center">
			<select
				className="border-2 border-gray-300 rounded-lg focus:outline-none mr-2 mt-10 text-center"
				value={mode}
				onChange={onModeChange}
			>
				<option value="user">User</option>
				<option value="subreddit">Subreddit</option>
			</select>
			<form onSubmit={onFormSubmit}>
				<input value={query} onChange={onQueryChange} placeholder="Query" className="border-2 border-gray-300 rounded-lg mt-10 indent-3"/>
			</form>
		</div>
	);
};
export default SearchField;
