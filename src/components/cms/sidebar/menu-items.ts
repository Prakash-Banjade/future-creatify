import { LayoutDashboard, NotebookText } from "lucide-react";
import { TGroupMenuItem } from "./sidebar";

export const cmsSidebarMenuItems: TGroupMenuItem[] = [
    {
        groupLabel: "Main",
        menuItems: [
            {
                title: "Dashboard",
                url: "/cms/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Blogs",
                url: "/cms/blogs",
                icon: NotebookText,
            }
        ],
    },
]