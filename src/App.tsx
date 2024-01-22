import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import { PostProvider } from "./components/PostProvider";
import SearchField from "./components/SearchField";
import { ThemeProvider } from "./components/ThemeProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ThemeProvider>
					<NavBar />
					<PostProvider>
						<SearchField />
					</PostProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}
