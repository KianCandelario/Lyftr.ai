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
import { createClient } from '@supabase/supabase-js'
import InfoIcon from "@/components/chat/buttons/InfoIcon";
import UserMenu from "@/components/chat/buttons/UserMenu";
import { ChevronRight } from "lucide-react"
import { poppins, inter, instrument_sans } from "@/lib/fonts/fonts";
import ClearPromptHistory from "@/components/chat/buttons/ClearPromptHistory";


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

    // Initialize Supabase client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        // Initial fetch of conversations
        const fetchConversations = async () => {
            try {
                const response = await fetch(`/api/conversations?user_id=${user_id}`);
                if (!response.ok) throw new Error("Error fetching conversations");
                const data = await response.json();
                setConversations(data);
            } catch (e) {
                console.error("Error fetching conversations:", e);
                setError("Error fetching conversations");
            } finally {
                setLoading(false);
            }
        };

        // Set up real-time subscription
        const subscription = supabase
            .channel('conversations')
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen to all events (insert, update, delete)
                    schema: 'public',
                    table: 'conversations',
                    filter: `user_id=eq.${user_id}` // Only listen to changes for current user
                },
                (payload) => {
                    switch (payload.eventType) {
                        case 'INSERT':
                            setConversations(prev => [...prev, payload.new as Conversation]);
                            break;
                        case 'DELETE':
                            setConversations(prev => 
                                prev.filter(conv => conv.prompt_id !== payload.old.prompt_id)
                            );
                            break;
                        case 'UPDATE':
                            setConversations(prev =>
                                prev.map(conv =>
                                    conv.prompt_id === payload.new.prompt_id
                                        ? { ...conv, ...payload.new }
                                        : conv
                                )
                            );
                            break;
                    }
                }
            )
            .subscribe();

        // Initial fetch
        fetchConversations();

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, [user_id, supabase]);

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
