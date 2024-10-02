type Props = { pageParam?: number }

export async function getPostRecommend({ pageParam }: Props) {
  const response = await fetch(
    `http://localhost:9090/api/postRecommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      cache: "no-store",
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  return response.json()
}
