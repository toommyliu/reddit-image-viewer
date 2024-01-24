import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import type { Query } from "../types";
import { usePosts } from "./PostProvider";
import PostResultGrid from "./PostResultGrid";

export default function SearchField() {
	const [query, setQuery] = useState<Query>({
		term: "",
		mode: "user"
	});
	const [submit, setSubmit] = useState(false);
	const [error, setError] = useState<Error | undefined>();
	const submitOnce = useRef(false);

	const { setPosts } = usePosts();
	const queryClient = useQueryClient();

	const updateQuery = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setQuery({
			...query,
			[event.target.name]: event.target.value.toLowerCase()
		});
		setSubmit(false);
	};

	const formSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(undefined);

		const { term } = query;
		if (query.mode === "user") {
			if (term.length < 3 || term.length > 20) {
				setError(new Error("bad username"));
			}
		} else {
			if (term.length < 3 || term.length > 22) {
				setError(new Error("bad subreddit"));
			}
		}

		if (!submitOnce.current) {
			submitOnce.current = true;
		}

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
			{error && <span className="text-2xl dark:text-red-500 mt-10">{error.message}</span>}
			{!(error instanceof Error) && submitOnce.current && (
				<PostResultGrid query={query} submit={submit} setSubmit={setSubmit} />
			)}
		</div>
	);
}
