import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "./sidebar";
import { Suspense } from "react";
import { Skeleton } from "../../ui/skeleton";
import AppBreadCrumb from "./app-bread-crumb";
import { ThemeToggleBtn } from "@/components/ui/theme-toggle";

type AppRootLayoutProps = {
    children: React.ReactNode,
}

export default function SidebarLayout({ children }: AppRootLayoutProps) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <AppBreadCrumb />

                    <div className="ml-auto flex items-center gap-10">
                        <ThemeToggleBtn />
                    </div>
                </header>
                <main className="h-full">
                    <Suspense fallback={<Skeleton className="h-full"></Skeleton>}>
                        {children}
                    </Suspense>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}