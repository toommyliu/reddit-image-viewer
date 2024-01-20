import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import Search from "./components/Search";

function App() {
	return (
		<div className="dark:bg-[#1f1f1f] min-h-screen">
			<ThemeProvider>
				<NavBar />
				<Search />
			</ThemeProvider>
		</div>
	);
}

export default App;
