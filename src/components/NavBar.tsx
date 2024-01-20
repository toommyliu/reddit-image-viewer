import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

function NavBar() {
	const { theme, setTheme } = useTheme();
	return (
		<>
			<nav className="flex items-center justify-between flex-wrap p-6 bg-slate-300 dark:bg-slate-800">
				<div className="flex items-center flex-shrink-0 mr-6">
					<span className="text-xl text-black dark:text-white">Reddit Image Viewer</span>
				</div>
				<button className="text-white" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
					{theme === "light" ? (
						<Sun className="h-[1.2rem] w-[1.2rem] text-slate-800" />
					) : (
						<Moon className="h-[1.2rem] w-[1.2rem]" />
					)}
				</button>
			</nav>
		</>
	);
}

export default NavBar;
