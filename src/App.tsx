import CardGrid from "@/components/card-grid";
import SearchBar from "@/components/search-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/nav-bar";
import { SearchProvider } from "@/components/search-context";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex h-screen flex-col">
				<Navbar />
				<SearchProvider>
					<SearchBar />
					<CardGrid />
				</SearchProvider>
			</div>
		</QueryClientProvider>
	);
}
