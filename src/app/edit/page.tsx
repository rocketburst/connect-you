import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import ProfileForm from "@/components/ProfileForn"
import MainLinksTable from "@/components/MainLinksTable"
import SocialLinksTable from "@/components/SocialLinksTable"
import MainLinksCreateModal from "@/components/MainLinksCreateModal"
import SocialLinksCreateModal from "@/components/SocialLinksCreateModal"

const EditPage: React.FC = async () => {
  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")

  const mainLinks = await db.mainLink.findMany({ where: { userId: user?.id } })
  const socialLinks = await db.socialLink.findMany({
    where: { userId: user?.id },
  })

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div className="flex-1 md:min-w-[42rem] ">
        <ProfileForm type="edit">
          <div className="space-y-4">
            <MainLinksTable data={mainLinks} />
            <MainLinksCreateModal />
          </div>

          <div className="space-y-4">
            <SocialLinksTable data={socialLinks} />
            <SocialLinksCreateModal />
          </div>
        </ProfileForm>
      </div>
    </div>
  )
}

export default EditPage
