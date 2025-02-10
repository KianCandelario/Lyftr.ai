import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { instrument_sans } from "@/lib/fonts/fonts";
import { MoreHorizontal,  } from "lucide-react"
import { FileIcon, SpeakerLoudIcon, ChevronDownIcon } from "@radix-ui/react-icons"

const MoreIcon = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex justify-center items-center">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className={`${instrument_sans.className} ml-1.5`}>More</span>
                </div>
            </DrawerTrigger>
            <DrawerContent>

                <DrawerHeader>
                    <DrawerTitle>
                        Upcoming Features
                    </DrawerTitle>
                    <DrawerDescription>
                        Features that are not yet available but are soon to come.
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <DrawerClose className="flex justify-center items-center">
                        <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground w-24 h-8 rounded-md px-3 text-xs flex justify-center items-center">
                            <ChevronDownIcon className="h-5 w-5" />
                            <span className={`${instrument_sans.className} ml-1.5`}>Close</span>
                        </div>
                    </DrawerClose>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    );
}
 
export default MoreIcon;