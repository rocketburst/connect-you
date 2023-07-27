import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/Button"

const Home: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-y-hidden">
      <section className="-mt-10 space-y-6">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Connect with people. ASAP.
          </h1>

          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Lightweight & clean version of LinkTree. It&apos;s Cool 😎
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-5 sm:space-y-0">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started
            </Link>

            <Link
              href="/example"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "cursor-pointer"
              )}
            >
              See Example
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
