import { createContext, useContext, useState, type ReactNode } from "react";
import type { Post } from "@/types";

type SearchContextProps = {
	children: ReactNode;
};

type SearchContextState = {
	mode: string;
	setMode: (mode: string) => void;

	query: string;
	setQuery: (query: string) => void;

	submit: boolean;
	setSubmit: (submit: boolean) => void;

	posts: Post[];
	setPosts: (posts: Post[]) => void;
};

const initialState: SearchContextState = {
	mode: "user",
	setMode: () => null,

	query: "",
	setQuery: () => null,

	submit: false,
	setSubmit: () => null,

	posts: [],
	setPosts: () => null
};

const SearchContext = createContext<SearchContextState>(initialState);

export function SearchProvider({ children, ...props }: SearchContextProps) {
	const [mode, setMode] = useState("user");
	const [query, setQuery] = useState("");
	const [submit, setSubmit] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]);

	const value = {
		mode,
		setMode: (mode: string) => {
			setMode(mode);
		},

		query,
		setQuery: (query: string) => {
			setQuery(query);
		},

		submit,
		setSubmit: (submit: boolean) => {
			setSubmit(submit);
		},

		posts,
		setPosts: (posts: Post[]) => {
			setPosts(posts);
		}
	};

	return (
		<SearchContext.Provider {...props} value={value}>
			{children}
		</SearchContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
	const context = useContext(SearchContext);

	if (context === undefined) {
		throw new Error("useSearchContext must be used within a SearchContext");
	}

	return context;
};
