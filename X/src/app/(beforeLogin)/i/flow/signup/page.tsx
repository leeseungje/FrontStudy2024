// 인터셉팅 라우팅
import LoginHome from '@/app/(beforeLogin)/_component/LoginHome'
import SignupModal from '@/app/(beforeLogin)/_component/SignupModal'

export default function Signup() {

  return (
    <>
      <LoginHome />
      <SignupModal />
    </>
  )
}
