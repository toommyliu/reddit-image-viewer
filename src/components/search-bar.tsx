import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useSearchContext } from "@/components/search-context";

const InputForm = () => {
	const { setQuery } = useSearchContext();
	return (
		<Input
			className="max-w-[256px] outline-none"
			placeholder="Query"
			onChange={(event) => setQuery(event.target.value)}
		/>
	);
};

const SelectMode = () => {
	const { mode, setMode } = useSearchContext();

	return (
		<Select value={mode} onValueChange={(value) => setMode(value)}>
			<SelectTrigger className="max-w-[128px] focus:outline-none" id="mode">
				{mode.charAt(0).toUpperCase() + mode.slice(1)}
			</SelectTrigger>
			<SelectContent className="">
				<SelectItem value="user">User</SelectItem>
				<SelectItem value="subreddit">Subreddit</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default function SearchBar() {
	const { setSubmit } = useSearchContext();

	return (
		<form
			className="flex flex-row items-center justify-center gap-3 py-5"
			onSubmit={(event) => {
				event.preventDefault();
				setSubmit(true);
			}}
		>
			<InputForm />
			<SelectMode />
		</form>
	);
}
