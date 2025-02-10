import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserCogIcon } from "lucide-react"
import { instrument_sans } from "@/lib/fonts/fonts"

const UserMenu = () => {
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="max-w-full flex items-center py-2">
                    <div className="w-[23%] flex justify-center items-center">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src="/assets/profile-default-svgrepo-com.svg"
                            />
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className={`w-[70%] ${instrument_sans.className}`}>
                        <span className="text-xs text-zinc-500 flex justify-start">Currently Logged in:</span>
                        <p className="overflow-hidden text-ellipsis">candelariokian888@gmail.com</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div>
                        <UserCogIcon />
                        <h1>Account</h1>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default UserMenu;