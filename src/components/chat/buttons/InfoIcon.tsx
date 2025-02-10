import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

const InfoIcon = () => {
    return (
        <Sheet>

            <SheetTrigger className="hover:bg-zinc-100 px-2 py-1 rounded-md">
                <InfoCircledIcon width={18} height={18} />
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>

                    <SheetTitle>About</SheetTitle>

                    <SheetDescription>
                        Someth Someth Someth hereee
                    </SheetDescription>

                </SheetHeader>
            </SheetContent>

        </Sheet>
    );
}
 
export default InfoIcon;