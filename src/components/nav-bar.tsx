import { Sun, Moon, type LucideProps } from "lucide-react";
import { cn } from "@/utils";

const GithubIcon = ({ className }: LucideProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("lucide lucide-github", className)}
		>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
};

export default function Navbar() {
	const mode = "light";
	return (
		<header className="flex items-center justify-between border-b-2 p-4 text-black">
			<div className="flex items-center gap-2">
				{/* <PiIcon className="h-8 w-8" /> */}
				<h1 className="text-2xl font-bold">Reddit Image Viewer</h1>
			</div>
			<div className="flex items-center gap-4">
				<GithubIcon className="h-6 w-6" />
				{mode === "light" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
			</div>
		</header>
	);
}
