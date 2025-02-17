"use client";

import { useEffect, useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
} from "@/components/ui/sidebar";
import {
 Tooltip,
 TooltipProvider,
 TooltipContent,
 TooltipTrigger
} from "@/components/ui/tooltip"
import InfoIcon from "@/components/chat/buttons/InfoIcon";
import UserMenu from "@/components/chat/buttons/UserMenu";
import { ChevronRight } from "lucide-react"
import { poppins, inter, instrument_sans } from "@/lib/fonts/fonts";
import ClearPromptHistory from "@/components/chat/buttons/ClearPromptHistory";
import DeletePrompt from "@/components/chat/buttons/DeletePrompt"


type Conversation = {
    prompt_id: any;
    created_at: any;
    prompt: any;
};

type SidebarProps = {
    email: string;
    user_id: string;
};

const AppSidebar = ({ email, user_id }: SidebarProps) => {
    const [conversations, setConversations] = useState<Conversation[]>(() => []);
    const [loading, setLoading] = useState<boolean>(() => true);
    const [error, setError] = useState<string | null>(() => "");

    useEffect(() => {
        
        const fetchConversation = async () => {
            try {
                const response = await fetch(`/api/conversations?user_id=${user_id}`)

                if (!response.ok) {
                    throw new Error("Error fetching conversation")
                }

                const data = await response.json();
                setConversations(data)
            } catch (e) {
                console.log("Error fetching conversation: " + e)
                setError("Error fetching conversation")
            } finally { 
                setLoading(false);
            }
        }

        fetchConversation();
    }, [user_id]);

    const isEmpty = () => {
        if (conversations.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <Sidebar>
            <SidebarHeader className="px-4 pt-3">
                <div className="flex justify-between items-center">
                    <span className={`${poppins.className} font-bold`}>Lyftr.ai</span>
                    <div className="flex items-center">
                        <ClearPromptHistory user_id={user_id} />
                        <InfoIcon />
                    </div>
                </div>
                <div className={`${inter.className} text-xs font-bold mt-2 flex items-center justify-between`}>
                    <div>
                        Prompt History
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className={`${instrument_sans.className} w-full rounded-lg bg-zinc-200 flex flex-col gap-1`}>
                            {
                                loading ? (
                                    <p>Loading...</p>
                                ) :
                                    error ? (
                                    <p>{error}</p>
                                ) :
                                    isEmpty() ? (
                                    <p className="p-2">There are no prompts yet.</p>
                                    ) :
                                        (
                                            conversations.map((conversation) => (
                                                <div
                                                    key={conversation.prompt_id}
                                                    className="hover:bg-zinc-100 p-2 m-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-between gap-2"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <ChevronRight className="w-3 h-3" />
                                                            {conversation.prompt}
                                                        </div>
                                                        {/* <div className="relative group">
                                                            <DeletePrompt />
                                                        </div> */}
                                                </div>
                                            ))
                                        )
                            }
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="py-3">
                <UserMenu email={email} />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
