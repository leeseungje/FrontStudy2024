import { User } from "@/model/User"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import { useSession } from "next-auth/react"

const useFollow = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const followMutation = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "post",
        },
      )
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = [{ id: session?.user?.email as string }]
              draft[index]._count.Followers += 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = [{ id: session?.user?.email as string }]
            draft._count.Followers += 1
          }
        }),
      )
    },
    onError: (error, userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = draft[index].Followers.filter(
                (v) => v.id !== session?.user?.email,
              )
              draft[index]._count.Followers -= 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = draft.Followers.filter(
              (v) => v.id !== session?.user?.email,
            )
            draft._count.Followers -= 1
          }
        }),
      )
    },
  })

  const unfollowMutation = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "delete",
        },
      )
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = draft[index].Followers.filter(
                (v) => v.id !== session?.user?.email,
              )
              draft[index]._count.Followers -= 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = draft.Followers.filter(
              (v) => v.id !== session?.user?.email,
            )
            draft._count.Followers -= 1
          }
        }),
      )
    },
    onError: (error, userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = [{ id: session?.user?.email as string }]
              draft[index]._count.Followers += 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = [{ id: session?.user?.email as string }]
            draft._count.Followers += 1
          }
        }),
      )
    },
  })

  const toggleFollow = (userId: string, followed: boolean) => {
    if (followed) {
      unfollowMutation.mutate(userId)
    } else {
      followMutation.mutate(userId)
    }
  }

  return { toggleFollow }
}

export default useFollow
