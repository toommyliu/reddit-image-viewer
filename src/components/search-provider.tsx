import { useInputState } from "@mantine/hooks";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Post } from "../types";

type SearchContextProps = {
	children: ReactNode;
};

type ReactDispatchSetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

type SearchContextState = {
	mode: string;
	setMode: ReactDispatchSetStateAction<string>;

	query: string;
	setQuery: (value: string | React.ChangeEvent<unknown> | null | undefined) => void;

	submit: boolean;
	setSubmit: ReactDispatchSetStateAction<boolean>;

	posts: Post[];
	setPosts: ReactDispatchSetStateAction<Post[]>;
};

const initialState: SearchContextState = {
	mode: "user",
	setMode: () => {},

	query: "",
	setQuery: () => {},

	submit: false,
	setSubmit: () => {},

	posts: [],
	setPosts: () => {},
};

const SearchContext = createContext<SearchContextState>(initialState);

export function SearchProvider({ children, ...props }: SearchContextProps) {
	const [mode, setMode] = useState("user");
	const [query, setQuery] = useInputState("");
	const [submit, setSubmit] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]);

	const value = {
		mode,
		setMode,

		query,
		setQuery,

		submit,
		setSubmit,

		posts,
		setPosts
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
