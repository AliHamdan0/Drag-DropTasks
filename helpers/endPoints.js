const baseUri = process.env.NEXT_PUBLIC_BACK_END_PUBLIC_PATH;
const key = process.env.NEXT_PUBLIC_KEY;
export const Tasks = `${baseUri}/todos?key=${key}`;
