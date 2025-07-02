import { LayoutDashboard, NotebookText, StickyNote, StretchHorizontal } from "lucide-react";
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
                icon: StickyNote,
            },
            {
                title: "Blogs",
                url: "/cms/blogs",
                icon: NotebookText,
            },
            {
                title: "Forms",
                url: "/cms/forms",
                icon: StretchHorizontal,
            },
        ],
    },
]