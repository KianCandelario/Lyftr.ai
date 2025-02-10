import { 
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon } from "lucide-react"
import { poppins, instrument_sans, inter } from "@/lib/fonts/fonts"
import { Button } from "@/components/ui/button"
import MoreIcon from "@/components/chat/buttons/MoreIcon"

const ChatbotPage = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-2 mb-5">
                    <h1 className={`${poppins.className} text-4xl font-bold`}>
                        hello, I'm Lyftr.ai
                    </h1>
                    <h3 className={`${poppins.className} text-zinc-700`}>
                        How can I help you today?
                    </h3>
                </div>
                <Card className="shadow-md w-[50%]">
                    <CardContent className="p-0">
                        <Textarea className={`${instrument_sans.className}`} placeholder="Start asking..." />
                    </CardContent>
                    <CardFooter className="flex justify-between p-4">

                        <MoreIcon />

                        <Button variant="outline" size="sm">
                            <SendIcon />
                        </Button>

                    </CardFooter>
                </Card>
            </div>

            <footer className="pb-5">
                <span className={`${inter.className} italic text-xs text-zinc-500`}>
                Lyfter.ai can make mistakes. Click the info button at the top-right of the sidebar to learn more.
                </span>
            </footer>
        </div> 
    );
}
 
export default ChatbotPage;