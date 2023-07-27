import ProfileEditForm from "@/components/ProfileEditForm"

const Edit: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div className="flex-1 md:min-w-[42rem] ">
        <ProfileEditForm />
      </div>
    </div>
  )
}

export default Edit
