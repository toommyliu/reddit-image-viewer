import { Shuffle, Trash2, ExternalLink } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { SubredditResponse } from "../types";
import { shuffle, subreddit, username } from "../utils";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
	const [query, setQuery] = useState("");
	const [mode, setMode] = useState("user");
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<{ title: string; url: string }[]>([]);
	const [success, setSuccess] = useState(true);

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
		event.preventDefault();

		if (query === "") {
			return;
		}

		setSuccess(true);
		setLoading(true);
		setPosts([]);

		let url = mode === "user" ? username(query) : subreddit(query);	
		url += ""; // ?limit=100
		
		// TODO: finish infinite scrolling

		console.log(`url: ${url}`);

		// TODO: better error handling
		fetch(`${url}`)
			.then((res) => {
				if (res.status !== 200) {
					setSuccess(false);
					return null;
				}
				return res.json();
			})
			.then((data: SubredditResponse) => {
				if (!data) {
					return;
				}
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
				setSuccess(true);
			})
			.catch((err) => {
				if ("reason" in err && "message" in err && "error" in err) {
					if (err["error"] === 404) {
						alert("404: Not Found");
					}
				}
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center">
				{loading ? (
					<span className="dark:text-white mt-10">Loading</span>
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
				{!success && <span className="dark:text-white mt-10">Failed to find any results!</span>}
				{posts.length > 0 && (
					<div className="space-x-5">
						<button
							className="dark:text-white mt-5"
							title="Clear Results"
							onClick={() => setPosts([])}
						>
							<Trash2 size={20} />
						</button>
						<button
							className="dark:text-white mt-5"
							title="Shuffle Results"
							onClick={() => setPosts(shuffle(posts))}
						>
							<Shuffle size={20} />
						</button>
						<button
							className="dark:text-white mt-5"
							title="View Link"
							onClick={() =>
								window.open(
									(mode === "user" ? username(query) : subreddit(query)).slice(0, -5)
								)
							}
						>
							<ExternalLink size={20} />
						</button>
					</div>
				)}
			</div>
			{!loading && posts.length > 0 && (
				<>
					<InfiniteScroll
						dataLength={posts.length}
						next={() => {
							alert("we need more!");
						}}
						hasMore={true}
						loader={<h4>Loading...</h4>}
					>
						<section className="w-fit mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-5 gap-x-10 mt-10 mb-5">
							{posts.map((post, idx) => (
								<Post img={post.url} title={post.title} key={`post-${idx}`} />
							))}
						</section>
					</InfiniteScroll>
				</>
			)}
		</>
	);
};

export default Search;
