import { Footprints, Heading, LayoutDashboard, NotebookText, Settings, StickyNote, StretchHorizontal } from "lucide-react";
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
    {
        groupLabel: "Globals",
        menuItems: [
            {
                title: "Header",
                url: "/cms/globals/header",
                icon: Heading
            },
            {
                title: "Footer",
                url: "/cms/globals/footer",
                icon: Footprints
            }
        ]
    },
    {
        groupLabel: "Settings",
        menuItems: [
            {
                title: "Site Settings",
                url: "/cms/site-settings",
                icon: Settings
            }
        ]
    }
]