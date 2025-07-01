import { LayoutDashboard, NotebookText, Send, StickyNote, StretchHorizontal } from "lucide-react";
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
            {
                title: "Form Submissions",
                url: "/cms/form-submissions",
                icon: Send,
            }
        ],
    },
]