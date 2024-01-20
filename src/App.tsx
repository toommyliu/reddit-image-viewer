import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import SearchField from "./components/SearchField";

function App() {
	return (
		<ThemeProvider>
			<NavBar />
			<SearchField />
		</ThemeProvider>
	);
}

export default App;
