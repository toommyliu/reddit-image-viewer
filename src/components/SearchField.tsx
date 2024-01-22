import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import InfiniteScroll from "react-infinite-scroller";
import type { Post, Query } from "../types";
import { makeSubredditUrl, makeUserUrl } from "../utils";
import Actions from "./Actions";
import PostCard from "./PostCard";
import { usePosts } from "./PostProvider";

type PostPage = { after: string; posts: Post[] };

export default function SearchField() {
	const [query, setQuery] = useState<Query>({
		term: "",
		mode: "user",
	});
	const { posts, setPosts } = usePosts();

	// TODO: searching then clearing results will constantly fetch new data

	const { isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<
		PostPage,
		Error,
		PostPage[],
		string[],
		string
	>({
		queryKey: ["posts"],
		// @ts-expect-error TODO: fix this
		queryFn: async ({ pageParam }) => {
			const controller = new AbortController();
			let url = query.mode === "user" ? makeUserUrl(query.term) : makeSubredditUrl(query.term);
			if (pageParam) {
				url += `?after=${pageParam}`;
			}
			console.log("url: ", url);
			const res = await fetch(url, { signal: controller.signal });
			/* eslint-disable */
			const json = await res.json();
			const ret: PostPage = { after: json.data.after || "none", posts: [] };
			for (let i = 0; i < json.data.children.length; i++) {
				const child = json.data.children[i];
				if (child.data.post_hint === "image") {
					const obj = { img_url: child.data.url, title: child.data.title, url: `https://reddit.com${child.data.permalink}` };
					ret.posts.push(obj);
				}
			}

			console.log(json);

			if (ret.posts.length === 0) {
				return;
			}

			setPosts([...posts, ...ret.posts]);
			return ret;
			/* eslint-enable */
		},
		getNextPageParam: (lastPage) => {
			if (lastPage?.after !== "none") {
				return lastPage.after;
			}
			return null;
		},
		initialPageParam: "",
		enabled: false,
	});

	const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		void fetchNextPage();
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center">
				{isLoading ? (
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
				<InfiniteScroll loadMore={() => void fetchNextPage()} hasMore={hasNextPage}>
					<section className="w-fit mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-5 gap-x-10 mt-10 mb-5">
						{posts.map((post, idx) => (
							<PostCard post={post} key={`post-${idx}`} />
						))}
					</section>
				</InfiniteScroll>
			</>
		</>
	);
}
