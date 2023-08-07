"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { toast } from "@/hooks/useToast"
import Icons from "@/components/Icons"

const UserAuthCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const login = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-4">
      <Card>
        <CardHeader className="">
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to ConnectYou by clicking the following button.
          </CardDescription>
        </CardHeader>

        <CardContent className="-mt-2 flex items-center justify-center">
          <Button onClick={() => login()} disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserAuthCard
