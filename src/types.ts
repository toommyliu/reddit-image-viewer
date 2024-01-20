// some info may be redacted because they're useless

export interface SubredditResponse {
	kind: string;
	data: {
		children: {
			kind: string;
			data: {
				subreddit: string;
				title: string;
				ups: number | string;
				upvote_ratio: number | string;
				post_hint: string;
				created: number;
				url_overridden_by_dest: string;
				author: string;
				url: string;
				is_video: boolean;
				created_utc: number;
			};
		}[];
	};
}
