import { MainLink } from "@prisma/client"
import { create } from "zustand"

type MainLinksForm = Pick<MainLink, "name" | "href">

interface LinksFormState {
  mainLinksState: MainLinksForm
  setMainLinksState: (data: Partial<MainLinksForm>) => void
}

export const useLinksFormStore = create<LinksFormState>((set) => ({
  mainLinksState: {
    name: "",
    href: "",
  },
  setMainLinksState: (data) =>
    set(({ mainLinksState }) => ({
      mainLinksState: { ...mainLinksState, ...data },
    })),
}))
