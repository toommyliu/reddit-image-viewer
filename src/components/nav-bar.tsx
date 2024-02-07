import { ActionIcon, AppShell, Group, Text, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";

const GithubIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-github"
		>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
};

export default function Navbar() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<AppShell header={{ height: 50 }}>
			<AppShell.Header
				style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
			>
				<Group h="100%" px="md">
					<Text fw={700}>Reddit Image Viewer</Text>
				</Group>
				<Group h="100%" px="md">
					<ActionIcon
						color={colorScheme === "dark" ? "white" : "dark"}
						onClick={toggleColorScheme}
						title="Toggle color scheme"
						variant="transparent"
					>
						{colorScheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</ActionIcon>
					<ActionIcon
						color={colorScheme === "dark" ? "white" : "dark"}
						title="View source code on Github"
						variant="transparent"
						onClick={() =>
							window.open(
								"https://github.com/toommyliu/reddit-image-viewer",
								"_blank",
								"noopener noreferrer"
							)
						}
					>
						<GithubIcon />
					</ActionIcon>
				</Group>
			</AppShell.Header>
		</AppShell>
	);
}
