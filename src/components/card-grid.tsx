import { useEffect, type FC, type ReactNode } from "react";
import { useSearchContext } from "@/components/search-provider";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardFooter } from "@/components/ui/card";
import { ExternalLink, Shuffle, Trash2 } from "lucide-react";
import { shuffle } from "@/utils";
import { useInView } from "react-intersection-observer";

type Post = {
	data: { post_hint: string; title: string; url: string; name: string };
};

const ImageCardGrid: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
			{children}
		</div>
	);
};

const ImageCard = ({ post }: { post: Post }) => {
	return (
		<Card key={`post-${post.data.name}`} className="w-full rounded-md border-2 drop-shadow-xl">
			<div className="border-b-2 py-3">
				<img className="h-90 mx-auto aspect-[4/3] w-full" src={post.data.url} decoding="async" />
			</div>
			<CardFooter>
				<span className="mt-3 text-lg font-bold">{post.data.title}</span>
			</CardFooter>
		</Card>
	);
};

const PostActionRow = () => {
	const { mode, query, posts, setPosts } = useSearchContext();
	const queryClient = useQueryClient();

	if (posts.length == 0) {
		return <></>;
	}

	return (
		<div className="mb-5 flex flex-row justify-center space-x-5">
			<button
				title="Clear Results"
				onClick={() => {
					setPosts([]);
					void queryClient.resetQueries({ queryKey: ["posts"] });
				}}
			>
				<Trash2 className="h-5 w-5" />
			</button>
			<button title="Shuffle Posts" onClick={() => setPosts(shuffle(posts))}>
				<Shuffle className="h-5 w-5" />
			</button>
			<button
				title="View Source Link"
				onClick={() => window.open(`https://reddit.com/${mode === "user" ? "u" : "r"}/${query}/`)}
			>
				<ExternalLink className="h-5 w-5" />
			</button>
		</div>
	);
};

export default function CardGrid() {
	const { mode, query, submit, posts, setSubmit, setPosts } = useSearchContext();

	const { isLoading, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
		queryKey: ["posts"],
		queryFn: async ({ signal, pageParam }) => {
			if (!query) {
				console.log("blocked");
				return null;
			}

			console.log("running query on: ", query);
			const url = new URL(`https://www.reddit.com/${mode === "user" ? "u" : "r"}/${query}.json`);
			if (pageParam) {
				url.searchParams.append("after", pageParam);
			}

			console.log("url:", url.toString());
			const req = await fetch(url.toString(), { signal });
			const json = await req.json();
			const ret = { after: json.data.after, posts: [] };
			ret.posts = json.data.children;
			// setSubmit(false);
			console.log(json);
			setPosts([...posts, ...ret.posts]);
			return ret;
		},
		enabled: false,
		retry: false,
		getNextPageParam: (lastPage) => lastPage.after,
		initialPageParam: ""
	});

	const [ref, inView] = useInView({
		rootMargin: "25px 0px"
	});

	useEffect(() => {
		if (inView && submit) {
			console.log("fetching next page!");
			void fetchNextPage();
		}
	}, [inView, submit, fetchNextPage]);

	// useEffect(() => {
	// 	if (inView) {
	// 		console.log("fetching next page!");
	// 	}
	// }, [inView]);

	if (!query) {
		return <></>;
	}

	if (isLoading) {
		return <span>loading...</span>;
	}

	return (
		<>
			<PostActionRow />
			<ImageCardGrid>
				{posts.map((post, idx) => {
					if (post.data.post_hint !== "image") {
						return null;
					}

					return <ImageCard post={post} key={`post-${idx}`} />;
				})}
			</ImageCardGrid>
			{submit && (
				<div className="align-center flex justify-center py-20">
					<button ref={ref}>load more</button>
				</div>
			)}
		</>
	);
}
