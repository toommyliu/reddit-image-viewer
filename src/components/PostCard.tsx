import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import type { Post } from "../types";

type PostProps = {
	post: Post;
};

export default function PostCard({ post }: PostProps) {
	const { img_url, title } = post;

	return (
		<Card className="w-80 h-96 rounded-md drop-shadow-lg">
			<CardBody className="items-center overflow-hidden h-64">
				<Image className="h-full w-full rounded-sm" src={img_url} />
			</CardBody>
			<Divider className="mt-5" />
			<CardFooter className="text-small justify-between h-16">
				{title}
			</CardFooter>
		</Card>
	);
}
