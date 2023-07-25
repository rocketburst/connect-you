import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import Icons from "@/components/Icons"

const ProfileCard = () => {
  return (
    <div className="max-w-xl">
      <Card>
        <div className="mt-5 flex items-center justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <CardHeader className="-mt-1 text-center">
          <CardTitle>John Doe</CardTitle>
          <CardDescription>
            VP of Developer Relations at Company
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <Button variant="outline">Certain Link 1</Button>
            <Button variant="outline">Certain Link 2</Button>
            <Button variant="outline">Certain Link 3</Button>
            <Button variant="outline">Certain Link 4</Button>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-center">
          <div className="space-x-3">
            <Button variant="outline" size="icon">
              <Icons.twitter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Icons.github className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Icons.linkedin className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Icons.instagram className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Icons.facebook className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfileCard
