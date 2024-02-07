import {
	ActionIcon,
	ActionIconGroup,
	Anchor,
	AspectRatio,
	Button,
	Card,
	CardSection,
	Center,
	Divider,
	Image,
	Loader,
	SimpleGrid,
	Text
} from "@mantine/core";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Shuffle, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type { JSONResponse, Post, PostPage } from "../types";
import { shuffle } from "../utils";
import { useSearchContext } from "./search-provider";
import { useInView } from "react-intersection-observer";

const PostCard = ({ post }: { post: Post }) => {
	if (post.post_hint !== "image") {
		return null;
	}

	return (
		<Card shadow="xl" padding="sm" radius="sm" style={{ overflow: "hidden" }} withBorder>
			<CardSection style={{ position: "relative", overflow: "hidden" }}>
				<AspectRatio ratio={4 / 3}>
					<Image src={post.url} fit="contain" />
				</AspectRatio>
			</CardSection>
			<Divider my="md" />
			<Anchor href={`https://reddit.com${post.permalink}`} target="_blank">
				<Text size="sm">{post.title}</Text>
			</Anchor>
		</Card>
	);
};

const PostActionRow = () => {
	const { mode, query, posts, setQuery, setPosts } = useSearchContext();
	const queryClient = useQueryClient();

	if (posts.length == 0) {
		return null;
	}

	return (
		<ActionIconGroup style={{ gap: "10px" }}>
			<ActionIcon
				title="Clear Results"
				variant="transparent"
				onClick={() => {
					setPosts([]);
					setQuery("");
					void queryClient.resetQueries({ queryKey: ["posts"] });
				}}
			>
				<Trash2 size={23} />
			</ActionIcon>
			<ActionIcon title="Shuffle Posts" variant="transparent" onClick={() => setPosts(shuffle(posts))}>
				<Shuffle size={23} />
			</ActionIcon>
			<ActionIcon
				title="View Source Link"
				variant="transparent"
				onClick={() =>
					window.open(
						`https://reddit.com/${mode === "user" ? "u" : "r"}/${query}/`,
						"_blank",
						"noopener noreferrer"
					)
				}
			>
				<ExternalLink size={23} />
			</ActionIcon>
		</ActionIconGroup>
	);
};

export default function CardGrid() {
	const { ref, inView } = useInView({
		threshold: 0.85
	});

	const { query, mode, posts, setPosts } = useSearchContext();
	const { isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery<
		PostPage,
		Error,
		PostPage[],
		string[],
		string
	>({
		queryKey: [`posts-${mode}-${query}`],
		queryFn: async ({ signal, pageParam }) => {
			if (query.length === 0) {
				throw new Error("no query");
			}

			const url = new URL(
				`https://www.reddit.com/${mode === "Subreddit" ? "r" : "user"}/${query}.json`
			);
			if (pageParam) {
				url.searchParams.append("after", pageParam);
			}

			console.log(url.toString());

			const req = await fetch(url.toString(), { signal });
			if (!req.ok) {
				throw new Error("bad request");
			}

			const json = (await req.json()) as JSONResponse;
			const ret: PostPage = { after: json.data.after as string, posts: [] };
			for (const child of json.data.children) {
				ret.posts.push(child.data as unknown as Post);
			}

			console.log(json.data.children);

			setPosts((prev) => [...prev, ...ret.posts]);

			return ret;
		},
		enabled: query.length > 0,
		initialPageParam: "",
		getNextPageParam: (lastPage) => lastPage?.after
	});

	useEffect(() => {
		if (!query.length) {
			return;
		}
		void fetchNextPage();
	}, [query, fetchNextPage]);

	useEffect(() => {
		if (inView) {
			void fetchNextPage();
		}
	}, [inView, fetchNextPage]);

	if (query.length === 0) {
		return null;
	}

	if (isLoading) {
		return (
			<Center p={30}>
				<Loader />
			</Center>
		);
	}

	return (
		<>
			<Center py={15}>
				<PostActionRow />
			</Center>
			<SimpleGrid cols={{ lg: 3, md: 2, sm: 1 }} mt={-50} p={50}>
				{posts.map((post) => (
					<PostCard key={post.created_utc} post={post} />
				))}
			</SimpleGrid>
			<Center>
				<Button
					ref={ref}
					onClick={() => void fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
					display={posts.length > 0 && hasNextPage ? "" : "none"}
					mb={100}
				>
					Load More
				</Button>
			</Center>
		</>
	);
}
