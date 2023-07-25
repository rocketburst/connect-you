export interface Profile {
  name: string
  description: string
  mainlinks: MainLink[]
  socialLinks: SocialLink[]
}

export interface MainLink {
  name: string
  href: string
}

export enum SocialType {
  Github = "github",
  Twitter = "twitter",
  Linkedin = "linkedin",
  Instagram = "instagram",
  Facebook = "facebook",
  Dribbble = "dribbble",
  Mail = "mail",
}

export interface SocialLink {
  type: SocialType
  href: string
}
