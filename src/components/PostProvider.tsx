import { createContext, useContext, useState, type ReactNode } from "react";
import type { Post } from "../types";

type PostProviderProps = {
	children: ReactNode;
};

type PostProviderState = {
	posts: Post[];
	setPosts: (posts: Post[]) => void;
};

const initialState: PostProviderState = {
	posts: [],
	setPosts: () => null,
};

const PostProviderContext = createContext<PostProviderState>(initialState);

export function PostProvider({ children, ...props }: PostProviderProps) {
	const [posts, setPosts] = useState<Post[]>([]);

	const value = {
		posts,
		setPosts: (posts: Post[]) => {
			setPosts(posts);
		},
	};

	return (
		<PostProviderContext.Provider {...props} value={value}>
			{children}
		</PostProviderContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
	const context = useContext(PostProviderContext);

	if (context === undefined) {
		throw new Error("usePosts must be used within a PostProvider");
	}

	return context;
};
