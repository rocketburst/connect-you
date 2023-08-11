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
import Link from "next/link"
import SocialIcon from "@/components/SocialIcon"
import { SocialLinkType } from "@prisma/client"

export const example = {
  name: "John Doe",
  description: "VP of Developer Relations at Company",
  mainlinks: [
    {
      name: "Certain Link 1",
      href: "https://www.youtube.com/",
    },
    {
      name: "Certain Link 2",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      name: "Certain Link 3",
      href: "https://linktr.ee/",
    },
    {
      name: "Certain Link 4",
      href: "https://bitly.com/",
    },
  ],
  socialLinks: [
    {
      id: "1",
      userId: "name",
      type: SocialLinkType.GITHUB,
      href: "https://github.com/",
    },
    {
      id: "2",
      userId: "name",
      type: SocialLinkType.TWITTER,
      href: "https://twitter.com/home",
    },
    {
      id: "3",
      userId: "name",
      type: SocialLinkType.LINKEDIN,
      href: "https://linkedin.com/",
    },
    {
      id: "4",
      userId: "name",
      type: SocialLinkType.INSTAGRAM,
      href: "https://instagram.com",
    },
  ],
}

const ExampleProfileCard: React.FC = () => {
  const { name, description, mainlinks, socialLinks } = example

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

export default ExampleProfileCard
