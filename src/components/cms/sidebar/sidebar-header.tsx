import { SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function AppSidebarHeader() {
    const { open } = useSidebar();

    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <section className="px-2">
                        <Link href="/" className="flex items-center gap-4">
                            <Image
                                width={40}
                                height={40}
                                src={`/logo.png`}
                                alt="Site Builder Logo"
                                className="w-auto"
                            />

                            {
                                open && (
                                    <section className="overflow-hidden">
                                        <h1 className="font-semibold text-xl leading-5 whitespace-nowrap">
                                            Site <span className="text-primary">Builder</span>
                                        </h1>
                                        <p className="text-xs text-muted-foreground font-medium whitespace-nowrap">By Prakash Banjade</p>
                                    </section>
                                )
                            }
                        </Link>
                    </section>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}