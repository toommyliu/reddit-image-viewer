import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import InfiniteScroll from "react-infinite-scroller";
import type { PostPage, Query } from "../types";
import { makeSubredditUrl, makeUserUrl } from "../utils";
import PostActionRow from "./PostActionRow";
import PostCard from "./PostCard";
import { usePosts } from "./PostProvider";

type PostResultGridProps = {
	query: Query;
	submit: boolean;
	setSubmit: Dispatch<SetStateAction<boolean>>;
};

export default function PostResultGrid({ query, submit, setSubmit }: PostResultGridProps) {
	const { posts, setPosts } = usePosts();
	const { isLoading, isFetchingNextPage, isError, error, status, hasNextPage, fetchNextPage } =
		useInfiniteQuery<PostPage, Error, PostPage[], string[], string>({
			queryKey: ["posts"],
			queryFn: async ({ pageParam, signal }) => {
				const { term } = query;
				if (query.mode === 'user') {
					if (term.length < 3 || term.length > 20) { 
						throw new Error('bad username');
					}
				} else {
					if (term.length < 3 || term.length > 22) {
						throw new Error('bad subreddit');
					}
				}

				let url = query.mode === "user" ? makeUserUrl(query.term) : makeSubredditUrl(query.term);
				if (pageParam) {
					url += `?after=${pageParam}`;
				}

				console.log("url: ", url);

				/* eslint-disable */
				const req = await fetch(url, { signal })
					.then((res) => res)
					.catch(() => null);

				if (!req?.ok) {
					throw new Error(`${query.mode} not found`);
				}

				const json = await req.json();
				console.log(json);

				const ret: PostPage = { after: json.data.after, posts: [] };

				if (json.data.children.length === 0) {
					throw new Error(`${query.mode === "user" ? "u" : "r"}/${query.term} has no posts`);
				}

				for (let i = 0; i < json.data.children.length; i++) {
					const child = json.data.children[i];
					if (child.data.post_hint === "image") {
						const obj = {
							img_url: child.data.url,
							title: child.data.title,
							url: `https://reddit.com${child.data.permalink}`,
						};
						ret.posts.push(obj);
					}
				}

				if (ret.posts.length === 0) {
					throw new Error("no compatible posts found");
				}

				setPosts([...posts, ...ret.posts]);
				return ret;
				/* eslint-enable */
			},
			getNextPageParam: (lastPage) => lastPage.after,
			initialPageParam: "",
			enabled: false,
			retry: false,
		});

	useEffect(() => {
		if (submit) {
			void fetchNextPage();
			setSubmit(false);
		}
	}, [fetchNextPage, setSubmit, query, submit]);

	return (
		<>
			<span className="text-2xl dark:text-white mt-10">{status}</span>
			{isError && <span className="text-2xl dark:text-white mt-10">{error.message}</span>}
			{isLoading && (
				<div className="flex flex-col justify-center items-center dark:text-white mt-10">
					<Loader2 size={20} className="animate-spin" />
					<span>Loading</span>
				</div>
			)}
			{
				<>
					<PostActionRow query={query} />
					<InfiniteScroll
						loadMore={() => void fetchNextPage()}
						hasMore={hasNextPage && !isFetchingNextPage}
					>
						<section className="w-fit mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-5 gap-x-10 mt-10 mb-5">
							{posts.map((post, idx) => (
								<PostCard post={post} key={`post-${idx}`} />
							))}
						</section>
					</InfiniteScroll>
				</>
			}
		</>
	);
}
