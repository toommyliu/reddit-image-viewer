import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import Search from "./components/Search";

function App() {
	return (
		<>
			<ThemeProvider>
				<NavBar />
				<Search />
			</ThemeProvider>
		</>
	);
}

export default App;
