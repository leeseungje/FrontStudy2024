export async function getFollowingPosts() {
  const response = await fetch("http://localhost:9090/api/followingPosts", {
    next: {
      tags: ["posts", "followings"],
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  return response.json()
}
