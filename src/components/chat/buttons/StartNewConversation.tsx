import { MessageCircleIcon } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { instrument_sans } from "@/lib/fonts/fonts"

interface StartNewConversationProp {
    handleNewConversation: () => void,
    disabled: boolean;
}
  

const StartNewConversation = ({handleNewConversation, disabled}: StartNewConversationProp) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger disabled={disabled}>
                <div className={`${instrument_sans.className} inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3`}>
                    <MessageCircleIcon className="h-5 w-5" />
                    Start new chat
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will clear all your chat history with the chatbot. Do you wish to proceed? <b>(This action cannot be undone.)</b></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleNewConversation}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default StartNewConversation;