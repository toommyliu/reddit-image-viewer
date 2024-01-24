import { useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Query } from "../types";
import { usePosts } from "./PostProvider";
import PostResultGrid from "./PostResultGrid";

export default function SearchField() {
	const [query, setQuery] = useState<Query>({
		term: "",
		mode: "user",
	});
	const [submit, setSubmit] = useState(false);

	const { setPosts } = usePosts();
	const queryClient = useQueryClient();

	const updateQuery = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setQuery({
			...query,
			[event.target.name]: event.target.value.toLowerCase(),
		});
	};

	const formSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// TODO: better way to deal with this? valid user -> invalid user
		void queryClient.resetQueries({ queryKey: ["posts"] });

		setPosts([]);
		setSubmit(true);
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex justify-center">
				<select
					className="border-2 border-gray-300 focus:outline-none mr-2 mt-10 text-center"
					value={query.mode}
					name="mode"
					onChange={(event) => updateQuery(event)}
				>
					<option value="user">User</option>
					<option value="subreddit">Subreddit</option>
				</select>
				<form onSubmit={formSubmit}>
					<input
						value={query.term}
						onChange={(event) => updateQuery(event)}
						placeholder="Query"
						name="term"
						className="border-2 border-gray-300 focus:outline-none mt-10 pl-3"
					/>
				</form>
			</div>
			<PostResultGrid query={query} submit={submit} setSubmit={setSubmit} />
		</div>
	);
}
