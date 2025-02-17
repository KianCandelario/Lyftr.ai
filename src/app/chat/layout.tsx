import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/chat/AppSidebar"
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/')
    }

    const userData = {
        id: data.user.id,
        email: data.user.email!
    }

    return (
        <SidebarProvider>
            <AppSidebar email={userData.email} user_id={userData.id} />
            <main className="h-dvh w-dvw">
                <SidebarTrigger className="mt-2.5 ml-2 absolute" />
                <div 
                    data-user-id={userData.id}
                    data-user-email={userData.email}
                    className="w-full h-full flex justify-center items-center"
                >
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}