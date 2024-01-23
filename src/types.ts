export type Post = {
	img_url: string;
	title: string;
	url: string;
};

export type PostPage = {
	posts: Post[];
	after: string; // after: "" from api
};

export type Query = {
	term: string;
	mode: string;
};
