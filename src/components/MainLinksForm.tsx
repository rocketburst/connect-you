"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name of link must be at least 2 characters",
  }),
  link: z.string().min(2).url({
    message: "Link must be a proper URL",
  }),
})

interface MainLinksFormProps {
  children?: React.ReactNode
}

const MainLinksForm: React.FC<MainLinksFormProps> = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Name",
      link: "https://www.youtube.com/",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // TODO: create main links
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>

          <Input id="name" className="col-span-3" {...register("name")} />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="link" className="text-right">
            Link URL
          </Label>

          <Input id="link" className="col-span-3" {...register("link")} />
          {errors?.link && (
            <p className="px-1 text-xs text-red-600">{errors.link.message}</p>
          )}
        </div>
      </div>

      {children}
    </form>
  )
}

export default MainLinksForm
