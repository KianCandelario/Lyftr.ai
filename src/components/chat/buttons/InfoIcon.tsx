import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
  } from "@/components/ui/sheet"
import { inter, poppins } from "@/lib/fonts/fonts";
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Dumbbell } from "lucide-react"

const InfoIcon = () => {
    return (
        <Sheet>

            <SheetTrigger className="hover:bg-zinc-100 px-2 py-1 rounded-md">
                <InfoCircledIcon width={18} height={18} />
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className={`flex items-center gap-2 text-xl font-bold ${inter.className}`}>
                        <InfoCircledIcon height={20} width={20} /> 
                        About
                    </SheetTitle>
                    <SheetDescription>
                        A short introduction and a comprehensive how-to guide for user of the application.
                    </SheetDescription>
                </SheetHeader>
                <Separator orientation="horizontal" className="my-5" />
                <div>
                    <div>
                        <div className={`flex ${inter.className} font-semibold text-xl`}>
                            <Dumbbell  />
                            <span>Lyftr.ai</span>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button>Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    );
}
 
export default InfoIcon;