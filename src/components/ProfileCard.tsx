import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Profile } from "@/types"
import Link from "next/link"
import SocialIcon from "@/components/SocialIcon"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  profile: Profile
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile: { name, description, mainlinks, socialLinks },
}) => {
  return (
    <div className="max-w-sm">
      <Card>
        <div className="mt-5 flex items-center justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <CardHeader className="-mt-1 text-center">
          <CardTitle>{name}</CardTitle>
          <CardDescription className="break-all">{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {mainlinks.map(({ name, href }) => (
              <Button variant="outline" key={name}>
                <Link href={href}>{name}</Link>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="flex items-center justify-center">
            <div className="space-x-3">
              {socialLinks.map((socialLink) => (
                <SocialIcon socialLink={socialLink} key={socialLink.type} />
              ))}
            </div>
          </div>

          <p
            className={cn(
              buttonVariants({ variant: "link" }),
              "cursor-pointer -mb-3 mt-3 text-right"
            )}
          >
            Email me here {"-->"}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfileCard
