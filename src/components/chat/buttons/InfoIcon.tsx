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
import { instrument_sans, inter } from "@/lib/fonts/fonts";
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Dumbbell, LucideMessageCircleWarning, HistoryIcon, LogOutIcon, MoreHorizontalIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image";


const InfoIcon = () => {
    return (
        <Sheet>

            <SheetTrigger className="hover:bg-zinc-200 transition-all ease-in-out duration-300 px-2 py-1 rounded-md">
                <InfoCircledIcon width={18} height={18} />
            </SheetTrigger>

            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle className={`flex items-center gap-2 text-xl font-bold ${inter.className}`}>
                        <InfoCircledIcon height={20} width={20} /> 
                        About
                    </SheetTitle>
                    <SheetDescription>
                        A short introduction and how-to guide for the user of the application.
                    </SheetDescription>
                </SheetHeader>
                <Separator orientation="horizontal" className="my-5" />
                <div>
                    <div>
                        <div className={`flex ${inter.className} font-semibold text-xl items-center gap-2`}>
                            <Dumbbell  />
                            <span>Lyftr.ai</span>
                        </div>
                        <div className={`${instrument_sans.className} text-sm mt-2 flex flex-col justify-center items-center text-justify`}>
                            <p>Lyftr.ai is an AI-powered chatbot built on <i><a className="hover:text-zinc-700 text-zinc-500 transition-all ease-in-out duration-300" href="https://ai.meta.com/blog/meta-llama-3/">Llama 3</a></i>, designed for anyone passionate about weightlifting or maintaining a healthy lifestyle (just like me! haha). Acting as your personal trainer, nutrition coach, and gym instructor, Lyftr.ai provides guidance on workouts, diet, and fitness.</p>
                            <Alert className="mt-3">
                                <LucideMessageCircleWarning className="w-4 h-4" />
                                <AlertTitle>Heads Up!</AlertTitle>
                                <AlertDescription>
                                    Since responses are AI-generated and may not always be accurate, be sure to double-check information and consult reliable sources for the best results.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="my-5" />

                    <div>
                        <div className={`flex ${inter.className} font-semibold text-xl items-center gap-2`}>
                            <HistoryIcon />
                            <span>Clearing Prompt History</span>
                        </div>
                        <div className={`${instrument_sans.className} text-sm mt-2 flex flex-col justify-center items-center`}>
                            <Image
                                src="/assets/del-prompt-history.png"
                                alt="Clear Prompt History"
                                width={350}
                                height={0}
                                className="my-2"
                            />
                            <p className="text-justify"> Click the red icon above to clear the prompt history. The web app currently doesn’t have a feature to delete specific prompts or view past conversations (because I built this project on a whim :) haha) However, I plan to continue this project and add those features in the future. Thank you for your understanding! </p>
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="my-5" />

                    <div>
                        <div className={`flex ${inter.className} font-semibold text-xl items-center gap-2`}>
                            <LogOutIcon />
                            <span>Logging out</span>
                        </div>
                        <div className={`${instrument_sans.className} text-sm mt-2 flex flex-col justify-center items-center`}>
                            <Image
                                src="/assets/log-out.png"
                                alt="Log out location"
                                width={350}
                                height={0}
                                className="my-2"
                            />
                            <p className="text-justify">To log out of the web app, click the button shown above. You'll find it in the bottom-left corner of the sidebar.</p>
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="my-5" />

                    <div>
                        <div className={`flex ${inter.className} font-semibold text-xl items-center gap-2`}>
                            <MoreHorizontalIcon />
                            <span>Upcoming Features</span>
                        </div>
                        <div className={`${instrument_sans.className} text-sm mt-2 flex flex-col justify-center items-center`}>
                            <Image
                                src="/assets/more.png"
                                alt="More button"
                                width={350}
                                height={0}
                                className="my-2"
                            />
                            <p className="text-justify">In case you're interested in seeing the upcoming features that might be added in the near future, just click the "More" button shown above! Thank you :)</p>
                        </div>
                    </div>

                </div>

                <SheetFooter className="mt-11">
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    );
}
 
export default InfoIcon;