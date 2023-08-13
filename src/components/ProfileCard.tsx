import { notFound, redirect } from "next/navigation"
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
import { cn } from "@/lib/utils"
import { db } from "@/lib/db"
import SocialIcon from "@/components/SocialIcon"
import Link from "next/link"

interface ProfileCardProps {
  profileHref: string
}

const ProfileCard: React.FC<ProfileCardProps> = async ({ profileHref }) => {
  const profile = await db.profile.findFirst({
    where: { uniqueHref: profileHref },
  })
  if (!profile) redirect("/create")

  const user = await db.user.findFirst({
    where: { id: profile.userId },
  })
  if (!user) return notFound()

  const mainLinks = await db.mainLink.findMany({ where: { userId: user.id } })
  const socialLinks = await db.socialLink.findMany({
    where: { userId: user?.id },
  })

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
          <CardTitle>{profile.name}</CardTitle>
          <CardDescription className="break-all">{profile.bio}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {mainLinks.map(({ name, href }) => (
              <Button variant="outline" key={name}>
                <Link href={href}>{name}</Link>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center">
            <div className="space-x-3">
              {socialLinks.map((socialLink) => (
                <SocialIcon socialLink={socialLink} key={socialLink.type} />
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
              Email {"-->"}
            </p>

            <p
              className={cn(
                buttonVariants({ variant: "default" }),
                "-mb-3 mt-3 cursor-pointer text-right"
              )}
            >
              Make Your Own
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfileCard
