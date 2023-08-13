import ProfileCard from "@/components/ProfileCard"

const ProfilePage: React.FC<{ params: { href: string } }> = async ({
  params: { href },
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ProfileCard profileHref={href} />
    </div>
  )
}

export default ProfilePage
