import { create } from "zustand"

interface FormLoadState {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const useFormLoadStore = create<FormLoadState>((set) => ({
  isLoading: false,
  setIsLoading: (value) => set((state) => ({ isLoading: value })),
}))
