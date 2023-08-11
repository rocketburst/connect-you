import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/db"
import ProfileCard from "@/components/ProfileCard"

const ProfilePage: React.FC<{ params: { href: string } }> = async ({
  params: { href },
}) => {
  const profile = await db.profile.findFirst({
    where: { uniqueHref: href },
  })
  if (!profile) redirect("/create")

  const user = await db.user.findFirst({
    where: { id: profile.userId },
  })
  if (!user) return notFound()

  const mainLinks = await db.mainLink.findMany({ where: { userId: user.id } })
  const socialLinks = await db.socialLink.findMany({
    where: { userId: user?.id },
  })

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ProfileCard
        profile={profile}
        mainLinks={mainLinks}
        socialLinks={socialLinks}
      />
    </div>
  )
}

export default ProfilePage
