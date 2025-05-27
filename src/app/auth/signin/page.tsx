"use client"

import { LoadingButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInAction } from './action'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export default function SignInPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await signInAction(values.email);
        } catch (e) {
            if (e instanceof Error) {
                form.setError("email", { type: "manual", message: e.message });
            } else {
                form.setError("email", { type: "manual", message: "An unexpected error occurred" });
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" required placeholder="name@gmail.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                A signin link will be sent to this email address.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    isLoading={form.formState.isSubmitting}
                    type="submit"
                    loadingText='Sending...'
                    className="w-full"
                >
                    Sign In
                </LoadingButton>
            </form>
        </Form>
    )
}