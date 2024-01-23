import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "./components/NavBar";
import { PostProvider } from "./components/PostProvider";
import SearchField from "./components/SearchField";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

export default function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
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
