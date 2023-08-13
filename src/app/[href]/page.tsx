import Icons from "@/components/Icons"
import ProfileCard from "@/components/ProfileCard"
import { Button } from "@/components/ui/Button"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation"

const ProfilePage: React.FC<{ params: { href: string } }> = async ({
  params: { href },
}) => {
  const profile = await db.profile.findFirst({
    where: { uniqueHref: href },
  })
  if (!profile) notFound()

  const dbUser = await db.user.findFirst({
    where: { id: profile.userId },
  })
  if (!dbUser) return notFound()

  const sessionUser = await getCurrentUser()

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ProfileCard profile={profile} />

      {dbUser.id === sessionUser?.id && (
        <Button
          variant={"outline"}
          size={"icon"}
          className="fixed bottom-4 right-4"
        >
          <Link href="/edit">
            <Icons.edit className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}

export default ProfilePage
