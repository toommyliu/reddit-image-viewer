import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import type { Post } from "../types";

type PostProps = {
	post: Post;
};

export default function PostCard({ post }: PostProps) {
	const { img_url, title } = post;

	return (
		<Card className="h-96 w-80 rounded-md drop-shadow-lg">
			<CardBody className="h-64 items-center overflow-hidden">
				<Image className="h-full w-full rounded-sm" src={img_url} />
			</CardBody>
			<Divider className="mt-5" />
			<CardFooter className="h-16 justify-between text-small">{title}</CardFooter>
		</Card>
	);
}
