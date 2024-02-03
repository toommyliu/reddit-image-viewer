import CardGrid from "@/components/card-grid";
import SearchBar from "@/components/search-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/nav-bar";
import { SearchProvider } from "@/components/search-context";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<div className="flex h-screen flex-col">
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
