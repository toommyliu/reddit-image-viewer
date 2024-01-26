import { createContext, useContext, useState, type ReactNode } from "react";
import type { Post } from "../types";

type PostProviderProps = {
	children: ReactNode;
};

type PostProviderState = {
	posts: Post[];
	setPosts: (posts: Post[]) => void;

	term: string;
	setTerm: (term: string) => void;

	mode: string;
	setMode: (mode: string) => void;
};

const initialState: PostProviderState = {
	posts: [],
	setPosts: () => null,

	term: "",
	setTerm: () => null,

	mode: "user",
	setMode: () => null
};

const PostProviderContext = createContext<PostProviderState>(initialState);

export function PostProvider({ children, ...props }: PostProviderProps) {
	const [posts, setPosts] = useState<Post[]>([]);
	const [term, setTerm] = useState("");
	const [mode, setMode] = useState("user");

	const value = {
		posts,
		setPosts: (posts: Post[]) => {
			setPosts(posts);
		},

		term,
		setTerm: (term: string) => {
			setTerm(term);
		},

		mode,
		setMode: (mode: string) => {
			setMode(mode);
		}
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
