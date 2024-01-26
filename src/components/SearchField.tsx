import { Input, Tab, Tabs } from "@nextui-org/react";
import type { FormEvent } from "react";
import { usePosts } from "./PostProvider";

export default function SearchField() {
	const { setMode, setTerm } = usePosts();

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// @ts-expect-error works fine
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		setTerm(event.target[0].value as string);
	};

	return (
		<div className="flex flex-col items-center mt-10">
			<Tabs
				className="focus:outline-none"
				color="primary"
				onSelectionChange={(key) => setMode(key as string)}
			>
				<Tab key="user" title="User" />
				<Tab key="subreddit" title="Subreddit" />
			</Tabs>
			<form className="w-1/4 mt-5" onSubmit={onSubmit}>
				<Input placeholder="Query" fullWidth={false} />
			</form>
		</div>
	);
}
