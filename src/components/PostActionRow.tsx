import { Trash2, Shuffle, ExternalLink } from "lucide-react";
import { shuffle, makeSubredditUrl, makeUserUrl } from "../utils";
import { usePosts } from "./PostProvider";
import type { Query } from "../types";

const BUTTON_SIZE = 20;

export default function PostActionRow({ query }: { query: Query }) {
	const { posts, setPosts } = usePosts();

	return (
		<div className="space-x-5">
			<button className="dark:text-white mt-5" title="Clear Results" onClick={() => setPosts([])}>
				<Trash2 size={BUTTON_SIZE} />
			</button>
			<button
				className="dark:text-white"
				title="Shuffle Results"
				onClick={() => setPosts(shuffle(posts))}
			>
				<Shuffle size={BUTTON_SIZE} />
			</button>
			<button
				className="dark:text-white"
				title="View Link"
				onClick={() =>
					window.open(
						(query.mode === "user"
							? makeUserUrl(query.term)
							: makeSubredditUrl(query.term)
						).slice(0, -5)
					)
				}
			>
				<ExternalLink size={BUTTON_SIZE} />
			</button>
		</div>
	);
}
