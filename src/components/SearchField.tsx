import { useState, type FormEvent } from "react";

const username = (u: string) => `https://www.reddit.com/user/${u}.json`;
const subreddit = (r: string) => `https://www.reddit.com/r/${r}.json`;

const SearchField = () => {
	const [query, setQuery] = useState("");
	const [mode, setMode] = useState("user");
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<string[]>([]);

	const onModeChange = (event: FormEvent<HTMLSelectElement>) => {
		event.preventDefault();
		// @ts-expect-error value exists
		setMode(event.target.value);
	};

	const onQueryChange = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		// @ts-expect-error value exists
		setQuery(event.target.value.toLowerCase());
	};

	const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		// probably not needed?
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
			.then((data) => {
				const { children } = data.data;
				for (const child of children) {
					console.log(child);
					const is_image = child.data["post_hint"] == "image";
					if (is_image) {
						const { preview } = child.data;
						if (preview["enabled"]) {
							setPosts((posts) => [...posts, child.data.url]);
						}
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
				<div>
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
									className="border-2 border-gray-300 rounded-lg mt-10"
								/>
							</form>
						</div>
					)}
				</div>
			</div>
			{!loading && posts.length > 0 && (
				<div className="grid grid-cols-3 gap-4 mt-10">
					{posts.map((post) => (
						// create a "card" for each image, the image should only take up the space its given
						// and be centered in the card
						<div className="flex justify-center">
							<img
								src={post}
								className=""
								alt="reddit post"
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default SearchField;
