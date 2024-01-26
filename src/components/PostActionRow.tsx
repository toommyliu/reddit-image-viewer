import { Button, ButtonGroup, type ButtonProps } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Shuffle, Trash2, type LucideIcon } from "lucide-react";
import { makeSubredditUrl, makeUserUrl, shuffle } from "../utils";
import { usePosts } from "./PostProvider";

type ButtonIconProps = ButtonProps & {
	icon: LucideIcon;
};

export default function PostActionRow() {
	const { mode, term, posts, setTerm, setPosts } = usePosts();
	const queryClient = useQueryClient();

	const createButton = ({ icon: Icon, ...props }: ButtonIconProps) => {
		return (
			<Button className="bg-transparent" {...props}>
				<Icon size={20} />
			</Button>
		);
	};

	return (
		<div className="space-x-5 mb-3 mt-3">
			<ButtonGroup>
				{createButton({
					icon: Trash2,
					onClick: () => {
						setTerm("");
						setPosts([]);
						void queryClient.resetQueries({ queryKey: ["posts"] });
					}
				})}
				{createButton({
					icon: Shuffle,
					onClick: () => setPosts(shuffle(posts))
				})}
				{createButton({
					icon: ExternalLink,
					onClick: () => window.open(mode === "user" ? makeUserUrl(term) : makeSubredditUrl(term))
				})}
			</ButtonGroup>
		</div>
	);
}
