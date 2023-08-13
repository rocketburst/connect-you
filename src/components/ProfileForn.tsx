"use client"

import * as z from "zod"
import Icons from "@/components/Icons"
import { Profile } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import { Label } from "@/components/ui/Label"
import { cn } from "@/lib/utils"
import { useImgPreviewStore } from "@/stores/imgPreview"
import { shallow } from "zustand/shallow"
import { useModalStore } from "@/stores/modal"
import { useState } from "react"
import { toast } from "@/hooks/useToast"
import { uploadFiles } from "@/lib/uploadthing"
import Link from "next/link"

const ProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please write an email to display.",
    })
    .email(),
  uniqueHref: z
    .string({
      required_error: "Please use a unqiue identifier.",
    })
    .min(4)
    .trim()
    .regex(/^[a-zA-Z0-9]/, {
      message: "Must only use alphanumeric characters",
    }),
  bio: z.string().max(160).min(4),
})

const ResSchema = z.object({
  message: z.custom<Profile>().nullable(),
  error: z.string().nullable(),
})

type ProfileFormValues = z.infer<typeof ProfileFormSchema>

interface ProfileFormProps {
  children: React.ReactNode
  type: "create" | "edit"
  defaultValues?: Partial<ProfileFormValues> & { image?: string }
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  children,
  type,
  defaultValues,
}) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: defaultValues ?? {},
  })
  const [imgFile, setFile] = useImgPreviewStore(
    (state) => [state.imgFile, state.setFile],
    shallow
  )
  const [changeImgPreviewModalVisibility] = useModalStore(
    (state) => [state.changeImgPreviewModalVisibility],
    shallow
  )
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: ProfileFormValues) => {
    const isRouteName =
      values.uniqueHref === "example" ||
      values.uniqueHref === "create" ||
      values.uniqueHref === "edit" ||
      values.uniqueHref === "sign-in"

    if (isRouteName)
      return toast({
        title: "Error",
        description:
          "The unique identifier can't be a critical route on this site!",
        variant: "destructive",
      })

    setIsLoading(true)

    let image: string
    if (imgFile) {
      const [res] = await uploadFiles({
        files: [imgFile],
        endpoint: "imageUploader",
      })
      image = res.fileUrl
    } else image = ""

    const { name, email, bio, uniqueHref } = values

    if (type === "create") {
      const { message, error } = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({ name, bio, email, uniqueHref, image }),
      })
        .then((res) => res.json())
        .then((data) => ResSchema.parse(data))

      if (message)
        toast({
          title: "Profile Created",
          description: `Successfully created profile for ${message.name}`,
        })

      if (error)
        toast({
          title: "Error",
          description: "There was a problem with creating the profile",
          variant: "destructive",
        })

      setIsLoading(false)
    } else {
      const { message, error } = await fetch("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ name, bio, email, uniqueHref, image }),
      })
        .then((res) => res.json())
        .then((data) => ResSchema.parse(data))

      if (message)
        toast({
          title: "Profile Updated",
          description: `Successfully updated profile for ${message.name}`,
        })

      if (error)
        toast({
          title: "Error",
          description: "There was a problem with updating the profile",
          variant: "destructive",
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Profile Picture</Label>
            <Input
              id="picture"
              type="file"
              onChange={(e) => setFile(e.target.files![0])}
            />
          </div>

          {defaultValues?.image && (
            <Link href={defaultValues.image} target="_blank">
              <p
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "cursor-pointer px-0"
                )}
              >
                See current profile pic
              </p>
            </Link>
          )}

          {imgFile && (
            <p
              className={cn(
                buttonVariants({ variant: "link" }),
                "cursor-pointer px-0"
              )}
              onClick={() => changeImgPreviewModalVisibility()}
            >
              See preview
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input placeholder="John Doe" {...field} />
                </div>
              </FormControl>
              <FormDescription>
                This is your public display name on your Connect You card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email that will be displayed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uniqueHref"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unqiue Identifier</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This will be used for the link of your Connect You Card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {type === "create" ? "Create Profile" : "Update profile"}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
