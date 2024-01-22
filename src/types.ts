// some info may be redacted because they're useless

export type Post = {
	img_url: string;
	title: string;
	url: string;
};

export type PostPage = {
	posts: Post[];
	next?: string; // after: "" from api
}

export type Query = {
	term: string;
	mode: string;
};
