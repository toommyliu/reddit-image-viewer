import { Button, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
	const [scroll, scrollTo] = useWindowScroll();

	if (scroll.y < 200) {
		return null;
	}

	return (
		<Group justify="right" style={{ position: "fixed", bottom: 5, right: -5 }}>
			<Button variant="transparent" onClick={() => scrollTo({ y: 0 })}>
				<ArrowUp />
			</Button>
		</Group>
	);
}
