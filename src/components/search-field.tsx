import { Button, Center, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchContext } from "./search-provider";

const TextInputField = ({ ...props }) => {
	return <TextInput name="query" placeholder="Query" style={{ width: "250px" }} {...props} />;
};

const SelectMode = ({ ...props }) => {
	return (
		<Select
			data={["User", "Subreddit"]}
			placeholder="Mode"
			defaultSearchValue="User"
			style={{ width: "150px" }}
			allowDeselect={false}
			withCheckIcon={false}
			{...props}
		/>
	);
};

export default function SearchField() {
	const { setQuery, setMode } = useSearchContext();

	const form = useForm({
		initialValues: {
			query: "",
			mode: "user"
		}
	});

	return (
		<Center mt={75}>
			<Flex>
				<form
					onSubmit={form.onSubmit((ret) => {
						setQuery(ret.query);
						setMode(ret.mode);
					})}
					style={{ display: "flex", flexDirection: "row", gap: 10 }}
				>
					<TextInputField {...form.getInputProps("query")} />
					<SelectMode {...form.getInputProps("mode")} />
					{/* this button is hidden as its not hidden but allows us to press enter to submit :p */}
					<Button type="submit" display="none" />
				</form>
			</Flex>
		</Center>
	);
}
