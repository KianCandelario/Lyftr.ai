"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserCogIcon } from "lucide-react"
import { instrument_sans } from "@/lib/fonts/fonts"
import { logout } from "@/app/chat/logout/actions"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

type userEmail = {
    email: string
}

const UserMenu = ( { email }: userEmail ) => {

    const handleLogOut = async () => {
        const result = await logout();

        if (result.success) {
            redirect('/');
        }
    }

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-lg">
                    <div className="max-w-full flex items-center py-2 bg-zinc-200 rounded-lg hover:bg-zinc-100 transition-all ease-in-out">
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
                            <p className="overflow-hidden text-ellipsis">{email}</p>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-5 mb-2" align="end">
                    <DropdownMenuLabel>
                        <div className={`${instrument_sans.className} text-xl flex flex-col`}>
                            <UserCogIcon />
                            <h1>Account</h1>
                        </div>
                        <div className={`${instrument_sans.className} font-normal`}>
                            Email: {email}
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    
                    <DialogTrigger asChild>
                        <DropdownMenuItem className={`flex items-center ${instrument_sans.className}`}>
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    You're about to go back to the landing page. Are you sure you want to log out of the web app?
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" size="sm" onClick={handleLogOut}>Sign out</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
 
export default UserMenu;