import UserAuthCard from "@/components/UserAuthCard"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

const SignInPage: React.FC = async () => {
  const user = await getCurrentUser()
  if (user) redirect("/create")

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <UserAuthCard />
    </div>
  )
}

export default SignInPage
