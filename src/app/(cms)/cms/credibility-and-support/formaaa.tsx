"use client";

import { LoadingButton } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
import { cn, showServerError } from '@/lib/utils';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { credibilityAndSupportDefaultValue, credibilityAndSupportSchema, TCredibilityAndSupport } from '@/schemas/credibility-and-support.schema';
import FaqsTabContent from '@/components/cms/credibility-and-support/faqs-tab-content';
import PartnersTabContent from '@/components/cms/credibility-and-support/partners-tab-content';
import { credibilityAndSupportTabs as casTabs } from './page';
import { TCredibilityAndSupportTableSelect } from '@/db/schema/credibility-and-support';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
    defaultTab: string;
    credibilityAndSupport: TCredibilityAndSupportTableSelect
}

export default function CredibilityAndSupportForm({ credibilityAndSupport: cas, defaultTab }: Props) {

    const [isPending, startTransition] = useTransition();

    const form = useForm<TCredibilityAndSupport>({
        resolver: zodResolver(credibilityAndSupportSchema),
        defaultValues: credibilityAndSupportDefaultValue,
    });

    function onSubmit(data: TCredibilityAndSupport) {
        startTransition(async () => {
            try {

                toast.success("Successfully updated");
            } catch (e) {
                showServerError(e);
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='@container h-full'>
                <section className="h-full flex flex-col space-y-6">
                    <header className='@6xl:px-24 @3xl:px-16 px-8 space-y-2'>
                        <h2 className=" text-3xl font-medium capitalize">Credibility and Support</h2>
                        <p className='font-normal text-muted-foreground text-sm'>
                            Reassure your audience with trust signals, affiliations, and helpful resources.
                        </p>
                    </header>
                    <section className="sticky top-0 z-[50] backdrop-blur-3xl border-y mb-0">
                        <section className="@6xl:px-24 @3xl:px-16 px-8 py-3 flex items-center justify-between flex-wrap gap-6">
                            <section className="text-sm flex gap-6">
                                <p>
                                    <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                    <time className="font-medium">{cas.updatedAt.toLocaleString()}</time>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Created:&nbsp;</span>
                                    <time className="font-medium">{cas.createdAt.toLocaleString()}</time>
                                </p>
                            </section>
                            <section>
                                <LoadingButton
                                    type="submit"
                                    isLoading={isPending}
                                    disabled={isPending}
                                    loadingText='Saving...'
                                    size={"lg"}
                                >
                                    Save Changes
                                </LoadingButton>
                            </section>
                        </section>
                    </section>

                    <section className='grow @6xl:grid grid-cols-3'>
                        <section className='col-span-2 border-r py-8'>
                            <Tabs defaultValue="account" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="password">Password</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">Make changes to your account here.</TabsContent>
                                <TabsContent value="password">Change your password here.</TabsContent>
                            </Tabs>

                            {/* <Tabs defaultValue={defaultTab} className='mt-8 w-full'>
                                <TabsList className="@6xl:pl-24 @3xl:pl-16 pl-8 py-0 space-x-2 w-full bg-transparent border-b rounded-none h-auto justify-start">
                                    {
                                        casTabs.map(t => (
                                            <TabsTrigger
                                                key={t.value}
                                                value={t.value}
                                                className={cn(
                                                    "relative !bg-transparent max-w-fit border-0 rounded-none px-3 py-4",
                                                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary",
                                                    form.formState.errors?.[t.value as keyof TCredibilityAndSupport] && "!text-destructive data-[state=active]:after:bg-destructive"
                                                )}
                                            >
                                                {t.label}
                                            </TabsTrigger>
                                        ))
                                    }
                                </TabsList>
                                <section className='@6xl:pl-24 @3xl:pl-16 pl-8 pt-4 @3xl:pr-16 pr-8 @6xl:pb-20'>
                                    <TabsContent value={casTabs[0].value}>
                                        <FaqsTabContent />
                                    </TabsContent>
                                    <TabsContent value={casTabs[1].value}>
                                        <PartnersTabContent />
                                    </TabsContent>
                                    <TabsContent value={casTabs[2].value}>
                                        <PartnersTabContent />
                                    </TabsContent>
                                    <TabsContent value={casTabs[3].value}>
                                        <PartnersTabContent />
                                    </TabsContent>
                                    <TabsContent value={casTabs[4].value}>
                                        <PartnersTabContent />
                                    </TabsContent>
                                </section>
                            </Tabs> */}
                        </section>
                    </section>
                </section>
            </form>
        </Form>
    )
}