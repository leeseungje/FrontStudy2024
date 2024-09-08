export async function getPostRecommend() {
  const response = await fetch("http://localhost:9090/api/postRecommends", {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  return response.json()
}
