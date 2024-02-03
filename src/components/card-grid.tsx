import { useEffect, type FC, type ReactNode } from "react";
import { useSearchContext } from "@/components/search-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardFooter } from "@/components/ui/card";
import { ExternalLink, Shuffle, Trash2 } from "lucide-react";
import { shuffle } from "@/utils";

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

	const { isLoading, refetch } = useQuery({
		queryKey: ["posts"],
		queryFn: async ({ signal }) => {
			if (!query) {
				console.log("blocked");
				return null;
			}
			// await new Promise((resolve) => setTimeout(resolve, 2_000));
			console.log("running query on: ", query);
			const out = await fetch(`https://www.reddit.com/${mode === "user" ? "u" : "r"}/${query}.json`, {
				signal
			})
				.then((res) => res.json())
				.finally(() => setSubmit(false));
			console.log(out);
			setPosts(out.data.children);
			return out;
		},
		enabled: false,
		retry: false
	});

	useEffect(() => {
		if (submit) {
			void refetch();
			console.log("calling");
		}
	}, [submit, refetch]);

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
		</>
	);
}
