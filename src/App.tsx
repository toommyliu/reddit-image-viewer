import CardGrid from "@/components/card-grid";
import SearchBar from "@/components/search-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/nav-bar";
import { SearchProvider } from "@/components/search-provider";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<div className="flex h-screen flex-col dark:bg-neutral-800">
					<Navbar />
					<SearchProvider>
						<SearchBar />
						<CardGrid />
					</SearchProvider>
				</div>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
