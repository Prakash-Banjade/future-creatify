"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/forms/loading-button";
import { useTransition } from "react";
import { showServerError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ENavLinkType,
  headerSchema,
  MAX_NAV_LINKS,
  THeaderDto,
} from "@/schemas/globals.schema";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import NavLinkFormField from "./navlinks-form-field";
import { Plus } from "lucide-react";
import { updateHeader } from "@/lib/actions/globals.action";
import { toast } from "sonner";
import { ECtaVariant } from "../../../../types/blocks.types";

type Props = {
  defaultValues: Partial<THeaderDto> & { id: string };
};

export default function HeaderForm({ defaultValues }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<THeaderDto>({
    resolver: zodResolver(headerSchema),
    defaultValues: defaultValues ?? {
      navLinks: [],
    },
  });

  function onSubmit(values: THeaderDto) {
    startTransition(async () => {
      try {
        await updateHeader(defaultValues.id, values);
        toast.success("Header updated");
      } catch (e) {
        showServerError(e);
        console.log(e);
      }
    });
  }

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="space-y-6 pb-40">
          <header className="container">
            <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">
              Header
            </h3>
          </header>
          <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
            <section className="container flex justify-end py-3">
              <LoadingButton
                type="submit"
                size={"lg"}
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving..."
              >
                Save
              </LoadingButton>
            </section>
          </section>

          <section className="container space-y-6">
            <NavLinksField />
          </section>
        </section>
      </form>
    </Form>
  );
}

function NavLinksField() {
  const form = useFormContext<THeaderDto>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `navLinks`,
  });

  return (
    <FormField
      control={form.control}
      name={`navLinks`}
      render={() => (
        <FormItem>
          <FormLabel>Navigation Links</FormLabel>
          <section className="space-y-2">
            {fields.map((f, idx) => {
              return (
                <FormField
                  key={f.id}
                  control={form.control}
                  name={`navLinks.${idx}`}
                  render={() => {
                    const isFieldError =
                      Array.isArray(form.formState.errors.navLinks) &&
                      !!form.formState.errors.navLinks[idx];
                    const navLinkType = form.watch(`navLinks.${idx}.type`);

                    return (
                      <FormItem>
                        <FormControl>
                          <NavLinkFormField
                            idx={idx}
                            name={`navLinks.${idx}`}
                            onRemove={() => remove(idx)}
                            isFieldError={isFieldError}
                            navLinkType={navLinkType}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
          </section>
          {fields.length < MAX_NAV_LINKS && (
            <FormControl>
              <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                className="font-normal text-xs w-fit"
                disabled={fields.length >= MAX_NAV_LINKS}
                onClick={() => {
                  if (fields.length >= MAX_NAV_LINKS) return;

                  append({
                    type: ENavLinkType.Internal,
                    text: "",
                    newTab: false,
                    subLinks: [],
                    url: "",
                    variant: ECtaVariant.Link,
                  });
                }}
              >
                <Plus size={16} /> Add Link
              </Button>
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
