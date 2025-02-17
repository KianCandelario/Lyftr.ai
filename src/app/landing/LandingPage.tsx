import { instrument_sans, poppins } from "@/lib/fonts/fonts";
import { AccountTab } from "@/components/landing/tab/AccountTab";
import { MailQuestion } from "lucide-react"
import { 
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose
 } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="px-24 h-full w-full flex gap-44 items-center bg-gradient-to-b from-zinc-50 to-zinc-200 relative">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="w-[45%] text-zinc-900 z-10">
        <h1 className={`${poppins.className} font-bold text-5xl`}><span className="text-7xl">Lyftr.ai</span>: Your All-in-One Health Companion</h1>
        <h3 className={`${instrument_sans.className} mt-5 w-[80%] text-zinc-700 mb-10`}>Get personalized nutrition advice, physical therapy tips, and gym guidance—all in one place! Start chatting with Lyftr.ai today and take control of your health journey!</h3>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <MailQuestion className="mr-1" /> <span>Done Signing up?</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className={`${instrument_sans.className}`}>
              <DialogTitle>Almost There! Verify Your Email</DialogTitle>
              <DialogDescription>
                We've sent a verification link to your email. Please check your inbox (and spam folder) to complete your sign-up.
                <br />
                <br />
                <span className="italic">NOTE: You won't be able to log in if you don't confirm your email.</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className={`${instrument_sans.className} text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90`}>
                Close
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="min-h-[63%] max-h-[88%] min-w-[30%] max-w-[35%] border shadow-lg bg-white rounded-2xl p-7 flex flex-col items-center justify-center gap-1 z-10">
        <div className="relative w-full flex flex-col justify-center items-center mb-3">
          <h1 className={`text-3xl font-bold ${poppins.className}`}>hello</h1>
          <h3 className={`${poppins.className} text-sm`}>
            please choose how you want to proceed
          </h3>
        </div>

        <AccountTab></AccountTab>
      </div>
    </div>
  );
};

export default LandingPage;