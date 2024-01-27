import { useInfiniteQuery } from "@tanstack/react-query";
import { usePosts } from "./PostProvider";
import type { PostPage } from "../types";
import { makeSubredditUrl, makeUserUrl } from "../utils";
import { Button, Spinner } from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostCard from "./PostCard";
import PostActionRow from "./PostActionRow";

export default function PostResultGrid() {
	const { ref, inView } = useInView();
	const { term, mode, posts, setPosts } = usePosts();
	const { fetchNextPage, isFetching } = useInfiniteQuery<PostPage, Error, PostPage[], string[], string>({
		queryKey: ["posts"],
		queryFn: async ({ pageParam, signal }) => {
			const url = new URL(`${mode === "user" ? makeUserUrl(term) : makeSubredditUrl(term)}.json`);
			if (pageParam) {
				url.searchParams.append("after", pageParam);
			}
			url.searchParams.append("raw_json", "1");

			console.log("url: ", url.toString());

			/* eslint-disable */
			const req = await fetch(url, { signal })
				.then((res) => res)
				.catch(() => null);

			if (!req?.ok) {
				throw new Error("bad post");
			}

			const json = await req.json();
			console.log(json);

			const ret: PostPage = { after: json.data.after, posts: [] };

			// if (json.data.dist === 0 || json.data.children.length === 0) {
			// 	throw new Error(`${query.mode === "user" ? "u" : "r"}/${query.term} has no posts`);
			// }

			for (let i = 0; i < json.data.children.length; i++) {
				const child = json.data.children[i];
				if (child.data.post_hint === "image") {
					const obj = {
						img_url: child.data.url,
						title: child.data.title,
						url: `https://reddit.com${child.data.permalink}`
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
		retry: false
	});

	useEffect(() => {
		if (term.length > 0 && inView) {
			void fetchNextPage();
			console.log("load!");
		}
	}, [term, inView, fetchNextPage]);

	return (
		<div className="mb-5 flex flex-col items-center">
			{/* first load */}
			{posts.length === 0 && isFetching && <Spinner label="Loading posts..." className="mt-10" />}
			<>
				{posts.length > 0 && <PostActionRow />}
				<div className="mx-auto grid justify-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post, idx) => (
						<PostCard key={`post-${idx}`} post={post} />
					))}
				</div>
				<Button ref={ref} className="mt-10">
					Load More
				</Button>
			</>
		</div>
	);
}
