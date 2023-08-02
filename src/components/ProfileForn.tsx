"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import Icons from "@/components/Icons"

const ProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please write an email to display.",
    })
    .email(),
  unqiueHref: z
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

type ProfileFormValues = z.infer<typeof ProfileFormSchema>

interface ProfileFormProps {
  children: React.ReactNode
  type: "create" | "edit"
}

const ProfileForm: React.FC<ProfileFormProps> = ({ children, type }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
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

  const onSubmit = (data: ProfileFormValues) => {}

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
          name="unqiueHref"
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
