// 인터셉팅 라우팅
import LoginHome from "@before/_component/LoginHome"
import SignupModal from "@before/_component/SignupModal"

export default function Signup() {
  return (
    <>
      <LoginHome />
      <SignupModal />
    </>
  )
}
