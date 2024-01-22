import { Trash2, Shuffle, ExternalLink } from "lucide-react";
import { shuffle, username, subreddit } from "../utils";
import { usePosts } from "./PostProvider";
import type { Query } from "../types";

export default function Actions({ query }: { query: Query }) {
	const { posts, setPosts } = usePosts();

	return (
		<div className="space-x-5">
			<button className="dark:text-white mt-5" title="Clear Results" onClick={() => setPosts([])}>
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
						(query.mode === "user" ? username(query.term) : subreddit(query.term)).slice(0, -5)
					)
				}
			>
				<ExternalLink size={20} />
			</button>
		</div>
	);
}
