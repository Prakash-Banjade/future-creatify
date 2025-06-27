"use client";

import { TPage } from '../../../../types/page.types'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageDtoSchema, TPageDto } from "@/schemas/page.schema"
import { useForm, useWatch } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, generateSlug } from '@/lib/utils';
import HeroTabContent from './tabs/hero-tab-content';
import ContentTabContent from './tabs/content-tab-content';
import SeoTabContent from './tabs/seo-tab-content';
import { useMemo } from 'react';

type Props = {
    page: TPage
}

const tabs = [
    {
        label: "Hero",
        value: "hero",
    },
    {
        label: "Content",
        value: "content",
    },
    {
        label: "SEO",
        value: "seo",
    }
]

export default function PageForm({ page }: Props) {
    const form = useForm<TPageDto>({
        resolver: zodResolver(PageDtoSchema),
        defaultValues: page,
    })

    function onSubmit(data: TPageDto) {
        console.log(data);
    }

    const name = useWatch({
        control: form.control,
        name: "name",
        defaultValue: "Untitled"
    });

    const slug = useMemo(() => {
        const nonEmptyName = name || "Untitled"
        return generateSlug(nonEmptyName, nonEmptyName === "Untitled")
    }, [name])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='@container h-full'>
                <section className="h-full flex flex-col space-y-6">
                    <h2 className="@6xl:px-24 @3xl:px-16 px-8 text-3xl font-medium capitalize">{name || "Untitled"}</h2>
                    <section className="sticky top-0 z-[1] backdrop-blur-3xl border-y mb-0">
                        <section className="@6xl:px-24 @3xl:px-16 px-8 py-3 flex items-center justify-between flex-wrap gap-6">
                            <section className="text-sm flex gap-6">
                                <p>
                                    <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                    <time className="font-medium">{page.updatedAt.toLocaleString()}</time>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Created:&nbsp;</span>
                                    <time className="font-medium">{page.createdAt.toLocaleString()}</time>
                                </p>
                            </section>

                            <section>
                                <Button size={"lg"}>
                                    Save Changes
                                </Button>
                            </section>
                        </section>
                    </section>

                    <section className='grow grid grid-cols-3'>
                        <section className='col-span-2 border-r py-8'>
                            <div className='@6xl:ml-24 @3xl:ml-16 ml-8 @6xl:pr-16 pr-10'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name <span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='py-5'
                                                    placeholder="Eg. About us"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Tabs defaultValue="hero" className='mt-8 w-full'>
                                <TabsList className="@6xl:pl-24 @3xl:pl-16 pl-8 py-0 space-x-2 w-full bg-transparent border-b rounded-none h-auto justify-start">
                                    {
                                        tabs.map(t => (
                                            <TabsTrigger
                                                key={t.value}
                                                value={t.value}
                                                className={cn(
                                                    "relative !bg-transparent max-w-fit border-0 rounded-none px-3 py-4",
                                                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                                                )}
                                            >
                                                {t.label}
                                            </TabsTrigger>
                                        ))
                                    }
                                </TabsList>
                                <section className='@6xl:pl-24 @3xl:pl-16 pl-8 pt-4 @6xl:pr-16 pr-10 '>
                                    <TabsContent value="hero">
                                        <HeroTabContent />
                                    </TabsContent>
                                    <TabsContent value="content">
                                        <ContentTabContent />
                                    </TabsContent>
                                    <TabsContent value="seo">
                                        <SeoTabContent />
                                    </TabsContent>
                                </section>
                            </Tabs>
                        </section>

                        <section className='@6xl:mr-24 @3xl:mr-16 mr-8 @6xl:pl-16 pl-10 py-10'>
                            <div className='space-y-2'>
                                <Label>Slug</Label>
                                <Input
                                    className='py-5'
                                    value={slug}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </section>
                    </section>
                </section>
            </form>
        </Form>
    )
}