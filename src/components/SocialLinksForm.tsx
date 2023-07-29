"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Input } from "@/components/ui/Input"
import { SocialLink } from "@prisma/client"
import { toast } from "@/hooks/useToast"

interface SocialLinksFormProps {
  children?: React.ReactNode
}

const FormSchema = z.object({
  type: z.string({
    required_error: "Please select a valid social media platform",
  }),
  link: z.string().min(2).url({
    message: "Link must be a proper URL",
  }),
})

const ResSchema = z.object({
  message: z.custom<SocialLink>().nullable(),
  error: z.string().nullable(),
})

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ children }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()

  const onSubmit = async ({ type, link }: z.infer<typeof FormSchema>) => {
    const { message, error } = await fetch("/api/links/social", {
      method: "POST",
      body: JSON.stringify({ link, type: type.toUpperCase() }),
    })
      .then((res) => res.json())
      .then((data) => ResSchema.parse(data))

    if (message)
      toast({
        title: "Social Link Created",
        description: `Successfully created ${type} link`,
      })

    if (error)
      toast({
        title: "Error",
        description: "There was a problem with creating the link",
      })

    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Desired Platform" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="GitHub">GitHub</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="https://instagram.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the link to your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  )
}

export default SocialLinksForm