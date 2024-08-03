// 인터셉팅 라우팅
import LoginHome from '@/app/(beforeLogin)/_component/LoginHome'
import LoginModal from '@/app/(beforeLogin)/_component/LoginModal'

export default function Page() {

  return (
    <>
      <LoginHome />
      <LoginModal />
    </>
  )
}
