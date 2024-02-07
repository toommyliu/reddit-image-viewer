import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CardGrid from "./components/card-grid";
import SearchField from "./components/search-field";
import { SearchProvider } from "./components/search-provider";
import Navbar from "./components/nav-bar";
import ScrollToTop from "./components/scroll-to-top";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<Navbar />
				<SearchProvider>
					<SearchField />
					<CardGrid />
				</SearchProvider>
				<ScrollToTop />
			</MantineProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
