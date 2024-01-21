import { Shuffle, Trash2, ExternalLink } from "lucide-react";
import { useState, type FormEvent, useEffect, useCallback } from "react";
import { shuffle, subreddit, username } from "../utils";
import Post from "./Post";

export default function Search() {
	const [query, setQuery] = useState("");
	const [mode, setMode] = useState("user");
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<{ title: string; url: string }[]>([]);
	const [page, setPage] = useState(1);
	const [submit, setSubmit] = useState(false);

	// load 9 posts at a time
	const loadPosts = useCallback(() => {
		if (!submit) {
			return;
		}
		if (query == "") {
			return;
		}

		const arr: typeof posts = [];

		let url = mode === "user" ? username(query) : subreddit(query);
		url += `?limit=${9 * page}`;
		console.log(`url: ${url}`);

		fetch(`${url}`)
			.then((res) => {
				if (res.status !== 200) {
					return;
				}
				return res.json();
			})
			.then((res) => {
				if (!res) {
					return;
				}
				console.log(res);
				/* eslint-disable */
				const startIndex = (page - 1) * 9;
				for (const child of res.data.children) {
					const is_image = child.data["post_hint"] == "image";
					if (is_image) {
						const obj = { title: child.data["title"], url: child.data["url"] };
						arr.push(obj);
					}
				}
				const endIndex = startIndex + arr.length;
				/* eslint-enable */
				setPosts((prev) => [...prev, ...arr.slice(startIndex, endIndex)]);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [mode, page, query, submit]);

	useEffect(() => {
		loadPosts();
	}, [loadPosts]);

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >=
			document.documentElement.scrollHeight
		) {
			console.log("incrementing page");
			setLoading(true);
			setPage((previous) => previous + 1);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (query === "") {
			return;
		}

		setLoading(true);
		setPosts([]);
		setSubmit(true);
		loadPosts();
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
							onChange={(event) => {
								setMode(event.target.value);
							}}
						>
							<option value="user">User</option>
							<option value="subreddit">Subreddit</option>
						</select>
						<form onSubmit={onFormSubmit}>
							<input
								value={query}
								onChange={(event) => {
									event.preventDefault();
									setQuery(event.target.value.toLowerCase());
								}}
								placeholder="Query"
								className="border-2 border-gray-300 rounded-lg mt-10 pl-3"
							/>
						</form>
					</div>
				)}
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
			<>
				<section className="w-fit mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-5 gap-x-10 mt-10 mb-5">
					{posts.map((post, idx) => (
						<Post img={post.url} title={post.title} key={`post-${idx}`} />
					))}
				</section>
			</>
		</>
	);
}
