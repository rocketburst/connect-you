import { SocialLink } from "@/types"
import { Button } from "@/components/ui/Button"
import Icons from "@/components/Icons"

interface SocialIconProps {
  socialLink: SocialLink
}

type SocialIconType = "github" | "twitter" | "linkedin" | "mail" | "instagram"

const SocialIcon: React.FC<SocialIconProps> = ({ socialLink }) => {
  const type = socialLink.type.toString() as SocialIconType
  const Icon = Icons[type]

  return (
    <Button variant="outline" key={socialLink.type} className="px-3">
      <Icon className="h-4 w-4" />
    </Button>
  )
}

export default SocialIcon
