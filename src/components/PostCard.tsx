// https://tailwindflex.com/@arya/responsive-products-grid

type PostProps = {
	img: string;
	title: string;
};

export default function PostCard({ img, title }: PostProps) {
	return (
		<div className="w-72 bg-white dark:dark:bg-[#1f1f1f] rounded border-2">
			<img src={img} alt="post" className="h-80 w-72 object-cover rounded-t" />
			<div className="px-4 py-3 w-256 ">
				<div className="border-b-2 border-gray-200 mb-2"></div>
				<span className="mr-3 mx-auto text-xs text-black dark:text-white">{title}</span>
			</div>
		</div>
	);
}
