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
import { FileIcon, SpeakerLoudIcon, ChevronDownIcon, ImageIcon } from "@radix-ui/react-icons"
import { LanguagesIcon } from "lucide-react"

interface MoreIconProps {
    disabled: boolean
}

const MoreIcon = ({disabled}: MoreIconProps) => {
    return (
        <Drawer>
            <DrawerTrigger disabled={disabled}>
                <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex justify-center items-center">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className={`${instrument_sans.className} ml-1.5`}>More</span>
                </div>
            </DrawerTrigger>
            <DrawerContent className="px-11">

                <DrawerHeader>
                    <DrawerTitle>
                        Upcoming Features
                    </DrawerTitle>
                    <DrawerDescription>
                        Major features that are not yet available but are soon to come.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex gap-5 w-full justify-center items-center">
                    <div className="flex-1 flex flex-col gap-3 hover:border-zinc-700 hover:scale-105 transition-all ease-in-out duration-300 justify-center items-center h-48 border rounded-lg">
                        <div>
                            <FileIcon className="w-10 h-10" />
                        </div>
                        <span className={`${instrument_sans.className} text-sm`}>
                            Document-Based Q&A
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3 hover:border-zinc-700 hover:scale-105 transition-all ease-in-out duration-300 justify-center items-center h-48 border rounded-lg">
                        <div>
                            <SpeakerLoudIcon className="w-10 h-10" />
                        </div>
                        <span className={`${instrument_sans.className} text-sm`}>
                            Speech-to-Text
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3 hover:border-zinc-700 hover:scale-105 transition-all ease-in-out duration-300 justify-center items-center h-48 border rounded-lg">
                        <div>
                            <ImageIcon className="w-10 h-10" />
                        </div>
                        <span className={`${instrument_sans.className} text-sm`}>
                           Image Recognition 
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3 hover:border-zinc-700 hover:scale-105 transition-all ease-in-out duration-300 justify-center items-center h-48 border rounded-lg">
                        <div>
                            <LanguagesIcon className="stroke-2 w-10 h-10" />
                        </div>
                        <span className={`${instrument_sans.className} text-sm`}>
                           Multi-language Support 
                        </span>
                    </div>
                </div>

                <DrawerFooter className="mt-3">
                    <DrawerClose className="flex justify-center items-center">
                        <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground w-24 h-8 rounded-md px-3 text-xs flex justify-center items-center">
                            <ChevronDownIcon className="h-4 w-4" />
                            <span className={`${instrument_sans.className} ml-1.5`}>Close</span>
                        </div>
                    </DrawerClose>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    );
}
 
export default MoreIcon;