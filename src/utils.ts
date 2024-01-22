export const makeUserUrl = (user: string) => `https://www.reddit.com/user/${user}.json`;
export const makeSubredditUrl = (sub: string) => `https://www.reddit.com/r/${sub}.json`;

export const shuffle = <T>(og_arr: T[]): T[] => {
  const arr = og_arr.slice();
  for (let i = arr.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};