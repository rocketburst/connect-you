import ProfileEditForm from "@/components/ProfileEditForm"
import { Separator } from "@/components/ui/Separator"

const Edit: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your Connect You profile here.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 md:min-w-[42rem] ">
            <ProfileEditForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
