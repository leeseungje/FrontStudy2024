import PhotoModal from "@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/page"
import Home from "@/app/(afterLogin)/home/page"

type PhotoProps = {
  params: { username: string; id: string; photoId: string }
}
export default function Photo({ params }: PhotoProps) {
  params.username // elonmusk
  params.id // 1
  params.photoId // 1
  return (
    <>
      <Home />
      <PhotoModal />
    </>
  )
}
