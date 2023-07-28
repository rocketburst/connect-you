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

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
}

interface ProfileFormProps {
  children: React.ReactNode
  type: "create" | "edit"
}

const ProfileForm: React.FC<ProfileFormProps> = ({ children }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
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

  console.log(imgFile)

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
                  <Input placeholder="shadcn" {...field} />
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
                This is your email that will be displayed with the mail icon.
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
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}

export default ProfileForm
