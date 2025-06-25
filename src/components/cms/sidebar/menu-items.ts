import { Columns4, LayoutDashboard, NotebookText } from "lucide-react";
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
                title: "Pages",
                url: "/cms/pages",
                icon: Columns4,
            },
            {
                title: "Blogs",
                url: "/cms/blogs",
                icon: NotebookText,
            }
        ],
    },
]