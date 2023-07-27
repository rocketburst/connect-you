import ProfileCard from "@/components/ProfileCard"
import { exampleProfile } from "@/config/example"

const Example: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ProfileCard profile={exampleProfile} />
    </div>
  )
}

export default Example
