import { Button } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react"


const DeletePrompt = () => {
    return (
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <AlertDialog>
                <AlertDialogTrigger>
                    <Trash2 width={15} height={15} className="stroke-red-500" />
                </AlertDialogTrigger>
            </AlertDialog>
        </div>
    );
}
 
export default DeletePrompt;