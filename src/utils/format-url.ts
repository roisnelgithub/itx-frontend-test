export const formatPath = (path: string) => {
  return path
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};