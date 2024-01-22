import { useState, type FormEvent } from "react";
import InfiniteScroll from "react-infinite-scroller";
import type { Query } from "../types";
import { makeSubredditUrl, makeUserUrl } from "../utils";
import Actions from "./Actions";
import PostCard from "./PostCard";
import { usePosts } from "./PostProvider";

export default function SearchField() {
	const [query, setQuery] = useState<Query>({
		term: "",
		mode: "user",
	});
	const { posts, setPosts } = usePosts();
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [submit, setSubmit] = useState(false);

	const loadPosts = () => {
		if (!submit) {
			return;
		}
		if (query.term == "") {
			return;
		}

		const arr: typeof posts = [];

		const { term, mode } = query;
		let url = mode === "user" ? makeUserUrl(term) : makeSubredditUrl(term);
		url += `?limit=${Math.min(9 * page, 100)}`;
		console.log(`url: ${url}`);

		// TODO: improve
		if (Math.min(9 * page, 100) == 100) {
			console.log("already hit limit, dont continue!");
			return;
		}

		const controller = new AbortController();
		fetch(url, { signal: controller.signal })
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
				/* eslint-disable */
				const startIndex = (page - 1) * 9;
				const endIndex = startIndex - 1 + 9;
				for (let i = startIndex; i < endIndex; i++) {
					const child = res.data.children[i];
					const obj = { title: child.data["title"], url: child.data["url"] };
					if (!obj.title || !obj.url) {
						return;
					}
					arr.push(obj);
				}
				/* eslint-enable */
				setPosts([...posts, ...arr]);
				setPage((prev) => prev + 1);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
				setSubmit(false);
			});
	};

	const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (query.term === "") {
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
							value={query.mode}
							onChange={(event) => {
								setQuery({
									...query,
									mode: event.target.value,
								});
							}}
						>
							<option value="user">User</option>
							<option value="subreddit">Subreddit</option>
						</select>
						<form onSubmit={onFormSubmit}>
							<input
								value={query.term}
								onChange={(event) => {
									event.preventDefault();
									setQuery({
										...query,
										term: event.target.value.toLowerCase(),
									});
								}}
								placeholder="Query"
								className="border-2 border-gray-300 rounded-lg mt-10 pl-3"
							/>
						</form>
					</div>
				)}
				{posts.length > 0 && <Actions query={query} />}
			</div>
			<>
				<InfiniteScroll pageStart={page} loadMore={loadPosts} hasMore={true}>
					<section className="w-fit mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-5 gap-x-10 mt-10 mb-5">
						{posts.map((post, idx) => (
							<PostCard img={post.url} title={post.title} key={`post-${idx}`} />
						))}
					</section>
				</InfiniteScroll>
			</>
		</>
	);
}
