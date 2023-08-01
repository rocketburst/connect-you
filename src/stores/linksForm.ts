import { MainLink } from "@prisma/client"
import { create } from "zustand"

type MainLinksForm = Pick<MainLink, "name" | "href">

type SocialLinksForm = {
  type: string
  href: string
}

interface LinksFormState {
  mainLinksState: MainLinksForm
  socialLinksState: SocialLinksForm
  setMainLinksState: (data: Partial<MainLinksForm>) => void
  setSocialLinksState: (data: Partial<SocialLinksForm>) => void
}

export const useLinksFormStore = create<LinksFormState>((set) => ({
  mainLinksState: {
    name: "",
    href: "",
  },
  socialLinksState: {
    type: "",
    href: "",
  },
  setMainLinksState: (data) =>
    set(({ mainLinksState }) => ({
      mainLinksState: { ...mainLinksState, ...data },
    })),
  setSocialLinksState: (data) =>
    set(({ socialLinksState }) => ({
      socialLinksState: { ...socialLinksState, ...data },
    })),
}))
