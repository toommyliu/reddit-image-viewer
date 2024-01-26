import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "./components/NavBar";
import { PostProvider } from "./components/PostProvider";
import SearchField from "./components/SearchField";
import { NextUIProvider } from "@nextui-org/react";
import { ColorModeProvider } from "@chakra-ui/color-mode";
import PostResultGrid from "./components/PostResultGrid";

const queryClient = new QueryClient();

export default function App() {
	return (
		<>
			<NextUIProvider>
				<QueryClientProvider client={queryClient}>
					<ColorModeProvider options={{ initialColorMode: "system" }}>
						<NavBar />
						<PostProvider>
							<SearchField />
							<PostResultGrid />
						</PostProvider>
					</ColorModeProvider>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</NextUIProvider>
		</>
	);
}
