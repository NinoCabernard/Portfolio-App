export async function searchItems(query: string) {
  if (!query) return [];

  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = ["React", "Vue", "Angular", "Svelte", "Tailwind", "Next.js"];

  return data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}
