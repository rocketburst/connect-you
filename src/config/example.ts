import { Profile, SocialType } from "@/types"

export const exampleProfile: Profile = {
  name: "John Doe",
  description: "VP of Developer Relations at Company",
  mainlinks: [
    {
      name: "Certain Link 1",
      href: "https://www.youtube.com/",
    },
    {
      name: "Certain Link 2",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      name: "Certain Link 3",
      href: "https://linktr.ee/",
    },
    {
      name: "Certain Link 4",
      href: "https://bitly.com/",
    },
  ],
  socialLinks: [
    {
      type: SocialType.Github,
      href: "https://github.com/",
    },
    {
      type: SocialType.Twitter,
      href: "https://twitter.com/home",
    },
    {
      type: SocialType.Linkedin,
      href: "https://linkedin.com/",
    },
    {
      type: SocialType.Dribbble,
      href: "https://dribbble.com/shots",
    },
  ],
}
