import { SocialLink } from "@/types"
import { Button } from "@/components/ui/Button"
import Icons from "@/components/Icons"

interface SocialIconProps {
  socialLink: SocialLink
}

const SocialIcon: React.FC<SocialIconProps> = ({ socialLink }) => {
  const Icon = Icons[socialLink.type]

  return (
    <Button variant="outline" key={socialLink.type}>
      <Icon className="h-4 w-4" />
    </Button>
  )
}

export default SocialIcon
