type Props = { pageParam?: number }

export async function getFollowingPosts({ pageParam }: Props) {
  const response = await fetch(
    `http://localhost:9090/api/followingPosts?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "followings"],
      },
      cache: "no-store",
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  return response.json()
}
