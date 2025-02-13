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

  let userEmail: string = data.user.email!

  return (
    <SidebarProvider>
      <AppSidebar email={userEmail} />
      <main className="h-dvh w-dvw">
        <SidebarTrigger className="mt-2.5 ml-2 absolute" />
        {children}
      </main>
    </SidebarProvider>
  )
}