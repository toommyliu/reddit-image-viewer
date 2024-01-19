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
				<div className="flex items-center justify-center min-h-screen">
					<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
						{posts.map((post) => (
							<div className="flex flex-col items-center mt-10 p-2 border-2 border-gray-300 rounded-lg w-64 h-64">
								<div className="w-full h-full overflow-hidden">
									<img src={post} className="w-full h-full object-cover" />
								</div>
								<div className="mt-2">
									<a href={post} className="text-lg font-bold">
										hello world
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default SearchField;
