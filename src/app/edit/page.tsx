import { redirect } from "next/navigation"
import MainLinksTable from "@/components/MainLinksTable"
import ProfileEditForm from "@/components/ProfileEditForm"
import { buttonVariants } from "@/components/ui/Button"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

const EditPage: React.FC = async () => {
  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")

  const mainLinks = await db.mainLink.findMany({ where: { userId: user?.id } })

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div className="flex-1 md:min-w-[42rem] ">
        <ProfileEditForm>
          <div className="space-y-4">
            <MainLinksTable data={mainLinks} />

            <p
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer"
              )}
            >
              Add Main Link
            </p>
          </div>

          <div>
            <p
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer"
              )}
            >
              Link Socials
            </p>
          </div>
        </ProfileEditForm>
      </div>
    </div>
  )
}

export default EditPage
