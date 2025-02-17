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
import { HistoryIcon } from "lucide-react"
import { useEffect, useState } from "react";


interface ClearPromptHistoryProps {
    user_id: string;
}

const ClearPromptHistory = ({user_id}: ClearPromptHistoryProps) => {
    const [historyCleared, setHistoryCleared] = useState<boolean>(() => false);

    const handleDeleteHistory = async () => {
        const res = await fetch('/api/history/clear', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id: user_id})
        })

        if (!res.ok) {
            throw new Error("Failed to delete history")
        }
        setHistoryCleared(true)
    }

    useEffect(() => {
        if (historyCleared === true) {
            window.location.reload()
        }
    }, [historyCleared]);

    return ( 
        <AlertDialog>
            <AlertDialogTrigger className="hover:bg-zinc-200 transition-all ease-in-out duration-300 px-2 py-1 rounded-md">
                <HistoryIcon width={18} height={18} className="stroke-red-600" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    You're about to delete all of the prompt history. Do you wish to proceed? <b>(This action cannot be undone.)</b>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteHistory}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default ClearPromptHistory;