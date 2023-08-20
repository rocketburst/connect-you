import { Profile } from "@prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { buttonVariants } from "@/components/ui/Button"
import { cn, getInitials } from "@/lib/utils"
import { db } from "@/lib/db"
import SocialIcon from "@/components/SocialIcon"
import Link from "next/link"

interface ProfileCardProps {
  profile: Profile
}

const ProfileCard: React.FC<ProfileCardProps> = async ({ profile }) => {
  const mainLinks = await db.mainLink.findMany({
    where: { userId: profile.userId },
  })
  const socialLinks = await db.socialLink.findMany({
    where: { userId: profile.userId },
  })

  return (
    <div className="max-w-sm">
      <Card>
        <div className="mt-5 flex items-center justify-center">
          <Avatar>
            <AvatarImage src={profile.image as string} alt={profile.name} />
            <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
        </div>

        <CardHeader className="-mt-1 text-center">
          <CardTitle>{profile.name}</CardTitle>
          <CardDescription className="break-all">{profile.bio}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {mainLinks.map(({ name, href }) => (
              <p
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "cursor-pointer"
                )}
                key={name}
              >
                <Link href={href} target="_blank">
                  {name}
                </Link>
              </p>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center">
            <div className="space-x-3">
              {socialLinks.map((socialLink) => (
                <Link
                  href={socialLink.href}
                  key={socialLink.type}
                  target="_blank"
                >
                  <SocialIcon socialLink={socialLink} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex space-x-5">
            <p
              className={cn(
                buttonVariants({ variant: "outline" }),
                "-mb-3 mt-3 cursor-pointer text-right"
              )}
            >
              <Link href={`mailto:${profile.email}`}>Email {"-->"}</Link>
            </p>

            <p
              className={cn(
                buttonVariants({ variant: "default" }),
                "-mb-3 mt-3 cursor-pointer text-right"
              )}
            >
              <Link href="/sign-in">Make Your Own</Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfileCard
