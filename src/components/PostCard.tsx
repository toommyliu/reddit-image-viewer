// https://tailwindflex.com/@arya/responsive-products-grid
import type { Post } from "../types";

type PostProps = {
	post: Post;
};

export default function PostCard({ post }: PostProps) {
	const { img_url, title } = post;

	return (
		<div className="w-72 bg-white dark:dark:bg-[#1f1f1f] rounded-t border-2">
			<img src={img_url} alt="post" className="h-80 w-72 object-cover rounded-t" />
			<div className="px-4 py-3 w-256 ">
				<div className="border-b-2 border-gray-200 mb-2"></div>
				<span className="mr-3 mx-auto text-xs text-black dark:text-white">{title}</span>
			</div>
		</div>
	);
}
