import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/chat/AppSidebar"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-dvh w-dvw">
        <SidebarTrigger className="mt-2.5 ml-2 absolute" />
        {children}
      </main>
    </SidebarProvider>
  )
}