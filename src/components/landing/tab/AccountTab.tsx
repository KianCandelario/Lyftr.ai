import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { poppins, inter } from "@/lib/fonts/fonts"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
 
export function AccountTab() {
  return (
    <Tabs defaultValue="sign_in" className="w-full">
      <TabsList className={`grid w-full grid-cols-2 ${poppins.className} mb-5`}>
        <TabsTrigger value="sign_in">sign in</TabsTrigger>
        <TabsTrigger value="sign_up">sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign_in">

        <div>
          <div className="flex flex-col gap-4">
            <div className={`${inter.className}`}>
              <Label htmlFor="email">email address</Label>
              <Input type="email" id="email" name="email" placeholder="enter your email address" />
            </div>

            <div className={`${inter.className}`}>
              <Label htmlFor="password" className="font-xs">password</Label>
              <Input type="password" id="password" name="password" placeholder="enter your password" />
            </div>

            <div className="flex items-center gap-1">
              <Checkbox id="show-password" className="rounded" />
              <Label htmlFor="show-password" className={`${inter.className} text-xs`}>show password</Label>
            </div>

            <Button variant="default" className={`${inter.className} text-xs mt-3 font-bold`}>Log in</Button>
          </div>

          <div className="my-7 flex justify-center items-center">
              <Separator orientation="horizontal" className="w-[43%] " />
              <span className={`mx-5 font-bold text-xs ${poppins.className}`}>or</span>
              <Separator orientation="horizontal" className="w-[43%]" />
          </div>

          <div className="w-full">
            <Button variant="outline" className={`${inter.className} text-xs w-full font-bold`}>
              <Image 
                src="assets/icons8-google.svg"
                width={20}
                height={20}
                alt="Google Icon"
              />
              Sign in with Google
            </Button>
          </div>

        </div>

      </TabsContent>
      <TabsContent value="sign_up">

      <div>
          <div className="flex flex-col gap-4">
            <div className={`${inter.className}`}>
              <Label htmlFor="email">email address</Label>
              <Input type="email" id="email" name="email" placeholder="enter your email address" />
            </div>

            <div className={`${inter.className}`}>
              <Label htmlFor="password" className="font-xs">password</Label>
              <Input type="password" id="password" name="password" placeholder="enter your password" />
            </div>

            <div className={`${inter.className}`}>
              <Label htmlFor="confirm-password" className="font-xs">confirm password</Label>
              <Input type="password" id="confirm-password" name="confirm-password" placeholder="re-enter your password" />
            </div>

            <div className="flex items-center gap-1">
              <Checkbox id="show-password" className="rounded" />
              <Label htmlFor="show-password" className={`${inter.className} text-xs`}>show password</Label>
            </div>

            <Button variant="default" className={`${inter.className} text-xs mt-3 font-bold`}>Register</Button>
          </div>

          <div className="my-5 flex justify-center items-center">
              <Separator orientation="horizontal" className="w-[43%] " />
              <span className={`mx-5 font-bold text-xs ${poppins.className}`}>or</span>
              <Separator orientation="horizontal" className="w-[43%]" />
          </div>

          <div className="w-full">
            <Button variant="outline" className={`${inter.className} text-xs w-full font-bold`}>
              <Image 
                src="assets/icons8-google.svg"
                width={20}
                height={20}
                alt="Google Icon"
              />
              Sign up with Google
            </Button>
          </div>

        </div>

      </TabsContent>
    </Tabs>
  )
}