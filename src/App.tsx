import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import SearchField from "./components/SearchField";

function App() {
	return (
		<div className="dark:bg-[#1f1f1f] h-screen">
			<ThemeProvider>
				<NavBar />
				<SearchField />
			</ThemeProvider>
		</div>
	);
}

export default App;
