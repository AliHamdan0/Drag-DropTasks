const baseUri = process.env.NEXT_PUBLIC_BACK_END_PUBLIC_PATH;
const key = process.env.NEXT_PUBLIC_KEY;
export const Tasks = `https://run.mocky.io/v3/0944758c-a8e8-4047-95a7-bcf5cf77e755`;
export const TasksDetails = (id) => `${baseUri}/todos/${id}?key=${key}`;
export const ModTask = (id) => `${baseUri}/todos/${id}?key=${key}`;
