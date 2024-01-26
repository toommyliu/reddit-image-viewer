import { useColorMode } from "@chakra-ui/color-mode";
import { Button, Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Github, Moon, Sun } from "lucide-react";

export default function NavBar() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Navbar>
				<NavbarBrand>
					<p className="font-bold text-xl">Reddit Image Viewer</p>
				</NavbarBrand>
				<NavbarContent justify="end">
					<NavbarItem>
						<Button
							className="bg-transparent"
							isIconOnly={true}
							onClick={() => window.open("https://github.com/toommyliu/reddit-image-viewer/")}
						>
							<Github />
						</Button>
						<Button
							className="bg-transparent"
							isIconOnly={true}
							onClick={() => toggleColorMode()}
						>
							{colorMode === "light" ? <Sun /> : <Moon />}
						</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			<Divider />
		</>
	);
}
