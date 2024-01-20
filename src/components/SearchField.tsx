import { useState, type FormEvent } from "react";
import { username, subreddit } from "../utils";
import type { SubredditResponse } from "../types";

// TODO: image grid doesnt respect theme and image cards are messed up when scrolling

const SearchField = () => {
	const [query, setQuery] = useState("");
	const [mode, setMode] = useState("");
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<{ title: string; url: string }[]>([]);

	const onModeChange = (event: FormEvent<HTMLSelectElement>) => {
		event.preventDefault();
		// @ts-expect-error value exists
		setMode(event.target.value as string);
	};

	const onQueryChange = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		// @ts-expect-error value exists
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		setQuery((event.target.value as string).toLowerCase());
	};

	const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (loading) {
			console.log("prevented request while loading already?");
			return;
		}

		setLoading(true);
		setPosts([]);
		event.preventDefault();

		const url = mode === "user" ? username(query) : subreddit(query);
		console.log(`url: ${url}`);

		fetch(url)
			.then((res) => res.json())
			.then((data: SubredditResponse) => {
				console.log(data);
				const { children } = data.data;
				for (const child of children) {
					const is_image = child.data["post_hint"] == "image";
					if (is_image) {
						setPosts((posts) => [
							...posts,
							{ title: child.data["title"], url: child.data["url"] },
						]);
					}
				}
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center">
				{loading ? (
					<button>Loading</button>
				) : (
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
							<input
								value={query}
								onChange={onQueryChange}
								placeholder="Query"
								className="border-2 border-gray-300 rounded-lg mt-10 pl-3"
							/>
						</form>
					</div>
				)}
			</div>
			{!loading && posts.length > 0 && (
				<div className="flex items-center justify-center">
					<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
						{posts.map((post, idx) => (
							<div className="flex flex-col items-center mt-10 p-2 border-2 border-gray-300 rounded-lg w-64 h-64">
								<img
									src={post.url}
									className="w-full h-full object-cover"
									onClick={(event) => event.preventDefault()}
								/>
								<a
									href={post}
									className="mt-2 text-center text-neutral-950 dark:text-white"
									key={`post-${idx}`}
								>
									{post.title}
								</a>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default SearchField;
