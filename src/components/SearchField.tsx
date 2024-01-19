import { useState, type FormEvent } from "react";

const SearchField = () => {
	const [query, setQuery] = useState("");

	const updateQuery = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();

		const q = event.currentTarget.value;
		setQuery(q);

		console.log(q);
	};

	return (
		<div className="flex justify-center">
			<select
				className="border-2 border-gray-300 rounded-lg focus:outline-none mr-2 mt-10 text-center">
				<option value="user">User</option>
				<option value="subreddit">Subreddit</option>
			</select>
			<input
				className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-1/4 mt-10"
				type="text"
				name="text"
				onChange={updateQuery}
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded mt-10 ml-2 h-10"
				type="button"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>
	);
};

export default SearchField;
