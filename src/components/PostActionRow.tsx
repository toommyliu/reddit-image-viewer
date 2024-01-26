import { Button, ButtonGroup } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Shuffle, Trash2 } from "lucide-react";
import { makeSubredditUrl, makeUserUrl, shuffle } from "../utils";
import { usePosts } from "./PostProvider";

export default function PostActionRow() {
	const { mode, term, posts, setTerm, setPosts } = usePosts();
	const queryClient = useQueryClient();

	const reset = () => {
		setTerm("");
		setPosts([]);
		void queryClient.resetQueries({ queryKey: ["posts"] });
	};

	return (
		<>
			{posts.length > 0 && (
				<div className="space-x-5 mb-3 mt-3">
					<ButtonGroup>
						<Button className="bg-transparent" onClick={reset} title="Clear">
							<Trash2 size={20} />
						</Button>
						<Button
							className="bg-transparent"
							onClick={() => setPosts(shuffle(posts))}
							title="Shuffle"
						>
							<Shuffle size={20} />
						</Button>
						<Button
							className="bg-transparent"
							onClick={() =>
								window.open(mode === "user" ? makeUserUrl(term) : makeSubredditUrl(term))
							}
							title="Open in Reddit"
						>
							<ExternalLink size={20} />
						</Button>
					</ButtonGroup>
				</div>
			)}
		</>
	);
}
