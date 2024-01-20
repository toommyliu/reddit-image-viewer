import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

function NavBar() {
	const { theme, setTheme } = useTheme();
	return (
		<>
			<nav className="flex items-center justify-between flex-wrap p-6 bg-slate-400 dark:bg-[#181818]">
				<div className="flex items-center flex-shrink-0 mr-6 gap-3">
					<span className="text-xl text-neutral-950 dark:text-white">Reddit Image Viewer</span>
					<div className="h-6 bg-black dark:bg-white w-0.5"></div>
					<a
						href="https://github.com/toommyliu/reddit-image-viewer"
						target="_blank"
						rel="noreferrer"
						className="text-xl text-neutral-950 dark:text-white"
					>
						Github
					</a>
				</div>
				<button className="text-white" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
					{theme === "light" ? (
						<Sun className="h-[1.2rem] w-[1.2rem] text-neutral-950" />
					) : (
						<Moon className="h-[1.2rem] w-[1.2rem]" />
					)}
				</button>
			</nav>
		</>
	);
}

export default NavBar;
