// https://tailwindflex.com/@arya/responsive-products-grid

type PostProps = {
	img: string;
	title: string;
};

const Post = ({ img, title }: PostProps) => {
	return (
		<>
			<div className="w-72 bg-white rounded border-2">
				<img src={img} alt="post" className="h-80 w-72 object-cover rounded-t" />
				<div className="px-4 py-3 w-256 ">
					<div className="border-b-2 border-gray-200 mb-2"></div>
					<span className="mr-3 mx-auto text-xs text-black">{title}</span>
				</div>
			</div>
		</>
	);
};

export default Post;
