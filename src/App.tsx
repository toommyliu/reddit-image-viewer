import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import SearchField from "./components/SearchField";
import { PostProvider } from "./components/PostProvider";

export default function App() {
	return (
		<>
			<ThemeProvider>
				<NavBar />
				<PostProvider>
					<SearchField />
				</PostProvider>
			</ThemeProvider>
		</>
	);
}
