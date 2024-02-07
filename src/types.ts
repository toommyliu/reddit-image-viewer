export type Post = JSONResponse["data"]["children"][0]["data"];

export type PostPage = {
	after?: string;
	posts: Post[];
};

// should cover both users and subreddits
export type JSONResponse = {
	kind: string;
	data: {
		after: string | null; // if there are more posts
		dist: number; // post count?
		children: {
			kind: string;
			data: {
				subreddit: string;
				subreddit_name_prefixed: string;
				title: string;
				post_hint: string;
				created: number;
				created_utc: number;
				author: string;
				permalink: string; // /r/subreddit/...
				url: string; // url to the image
				ups: number;
			};
		}[];
		before: string | null;
	};
};
