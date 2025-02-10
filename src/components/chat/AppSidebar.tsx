import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import InfoIcon from "@/components/chat/buttons/InfoIcon"
import UserMenu from "@/components/chat/buttons/UserMenu"
import { poppins, inter } from "@/lib/fonts/fonts"

const AppSidebar = () => {
    return ( 
        <Sidebar>
            <SidebarHeader className="px-4 pt-3">
                <div className="flex justify-between items-center">
                    <span className={`${poppins.className} font-bold`}>Lyftr.ai</span>
                    <InfoIcon />
                </div>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel className={`${inter.className} font-bold`}>Prompt History</SidebarGroupLabel>
                    <SidebarGroupContent>

                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter className="pb-3">
                <UserMenu />
            </SidebarFooter>
        </Sidebar>
    );
}
 
export default AppSidebar;