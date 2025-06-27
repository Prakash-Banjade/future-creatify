"use client";

import { useEffect, useState, useTransition } from 'react';
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useFetchData } from '@/hooks/useFetchData';
import { DataTable } from '../data-table/data-table';
import { LoaderCircle, Search, X } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import CloudinaryImage from '../ui/cloudinary-image';
import { TMedia } from '../../../types/media.types';
import { Input } from '../ui/input';
import { cn, createQueryString, showServerError } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { mediaSchema, TMediaSchema } from '@/schemas/media.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadMedia } from '@/lib/actions/media.action';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from '../ui/textarea';
import { CldUploadWidget } from 'next-cloudinary';
import { CLOUDINARY_SIGNATURE_ENDPOINT } from '@/CONSTANTS';
import CustomDialog from '../ui/custom-dialog';
import LoadingButton from './loading-button';


type Props = {
  onChange: (value: TMediaSchema) => void
}

export default function MediaField({ onChange }: Props) {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [createNewOpen, setCreateNewOpen] = useState(false);

  return (
    <section className='border rounded-md p-4 flex items-center gap-4'>
      <CustomDialog
        isOpen={createNewOpen}
        onClose={() => setCreateNewOpen(false)}
        title='Create New Media'
        className="full-screen-dialog"
      >
        <CreateNew
          onClose={() => setCreateNewOpen(false)}
          onChange={onChange}
        />
      </CustomDialog>

      <Button
        type="button"
        variant={"secondary"}
        size={"sm"}
        className='font-normal text-xs'
        onClick={() => setCreateNewOpen(true)}
      >
        Upload New
      </Button>

      <span className='text-muted-foreground'>or</span>

      <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant={"secondary"}
            size={"sm"}
            className='font-normal text-xs'
          >
            Choose Existing
          </Button>
        </DialogTrigger>
        <DialogContent className='full-screen-dialog block'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <span id="dialog-title">Media</span>
              <Button
                type="button"
                variant={"secondary"}
                size={"sm"}
                className='font-normal text-xs'
                onClick={() => setCreateNewOpen(true)}
              >
                Upload New
              </Button>
            </DialogTitle>
          </DialogHeader>
          <section className='pt-10'>
            <MediaSelector
              onChange={onChange}
              onClose={() => setSelectorOpen(false)}
            />
          </section>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function CreateNew({ onClose, onChange }: { onClose: () => void } & Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TMediaSchema>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      alt: "",
      caption: "",
    }
  });

  function onSubmit(data: TMediaSchema) {
    startTransition(async () => {
      try {
        await uploadMedia(data);
        onChange(data);
        onClose();
      } catch (e) {
        showServerError(e);
      }
    })
  }

  return (
    <Form {...form}>
      <section className='space-y-6'>
        <section className='space-y-2'>
          <section className={cn(
            'border rounded-sm overflow-hidden',
            form.formState.errors.originalName && "border-destructive"
          )}>
            <FormField
              control={form.control}
              name="originalName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {
                      !!field.value ? (
                        <section className='flex items-center'>
                          <CloudinaryImage
                            src={form.getValues("secure_url")}
                            alt='alt'
                            width={150}
                            height={150}
                          />

                          <section className='flex-1 p-6 flex items-center justify-between gap-6'>
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name <span className='text-destructive'>*</span></FormLabel>
                                  <FormControl>
                                    <Input
                                      className='py-5 min-w-[300px]'
                                      placeholder="Eg. brandLogo"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type='button'
                              size={"icon"}
                              variant={'outline'}
                              onClick={() => form.reset({
                                alt: form.getValues("alt"),
                                caption: form.getValues("caption")
                              })}
                            >
                              <X />
                            </Button>
                          </section>
                        </section>
                      ) : (
                        <section className='p-6'>
                          <CldUploadWidget
                            signatureEndpoint={CLOUDINARY_SIGNATURE_ENDPOINT}
                            onSuccess={async (result) => {
                              if (typeof result.info === "object" && "secure_url" in result.info) {
                                form.reset({
                                  alt: form.getValues("alt"),
                                  caption: form.getValues("caption"),
                                  bytes: result.info.bytes,
                                  format: result.info.format,
                                  height: result.info.height,
                                  name: result.info.original_filename + '.' + result.info.format,
                                  originalName: result.info.original_filename + '.' + result.info.format,
                                  resource_type: result.info.resource_type,
                                  secure_url: result.info.secure_url,
                                  width: result.info.width,
                                  public_id: result.info.public_id,
                                });
                              }
                            }}
                            options={{
                              cropping: true,
                              maxFiles: 1,
                              maxFileSize: 5 * 1024 * 1024, // 5MB
                            }}
                          >
                            {({ open }) => {
                              function handleOnClick() {
                                open();
                              }

                              return (
                                <Button
                                  type="button"
                                  variant={"secondary"}
                                  size={"sm"}
                                  className='font-normal text-xs'
                                  onClick={handleOnClick}
                                >
                                  Select a file
                                </Button>
                              );
                            }}
                          </CldUploadWidget>
                        </section>
                      )
                    }
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          {
            form.formState.errors.originalName && (
              <p className='text-destructive'>{form.formState.errors.originalName?.message}</p>
            )
          }
        </section>

        <FormField
          control={form.control}
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt <span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <Input
                  className='py-5'
                  placeholder="Eg. an alternative text to describe the media"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Title"
                  className="field-sizing-content overflow-y-hidden resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <section className='flex justify-end'>
          <LoadingButton
            isLoading={isPending}
            loadingText='Saving...'
            onClick={form.handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </section>
      </section>
    </Form>
  )
}

function MediaSelector({ onClose, onChange }: { onClose: () => void } & Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data, isLoading } = useFetchData<(TMediaSchema & { updatedAt: Date })[]>({
    endpoint: '/media',
    queryKey: ['media', debouncedSearch],
    queryString: createQueryString({
      q: debouncedSearch,
      resource_type: 'image',
    })
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const mediaColumns: ColumnDef<(TMediaSchema & { updatedAt: Date })>[] = [
    {
      accessorKey: 'secure_url',
      header: "File Name",
      cell: ({ row }) => {
        return (
          <section
            role="button"
            className='flex items-center gap-5 p-2 hover:cursor-pointer'
            onClick={() => {
              onChange(row.original);
              onClose();
            }}
          >
            <CloudinaryImage
              src={row.original.secure_url}
              alt={row.original.alt}
              height={48}
              width={48}
              crop='auto'
            />
            <span className='text-sm underline underline-offset-2'>{row.original.name}</span>
          </section>
        )
      }
    },
    {
      accessorKey: 'alt',
      header: "Alt",
      cell: ({ row }) => {
        return (
          <span className='text-sm'>{row.original.alt || "<No Alt>"}</span>
        )
      }
    },
    {
      accessorKey: 'caption',
      header: "Caption",
      cell: ({ row }) => {
        return (
          <span className='text-sm'>{row.original.caption || "<No Caption>"}</span>
        )
      }
    },
    {
      accessorKey: 'updatedAt',
      header: "Updated At",
      cell: ({ row }) => {
        return (
          <span className='text-sm'>{new Date(row.original.updatedAt).toLocaleString()}</span>
        )
      }
    }
  ]

  if (isLoading) return (
    <div className='flex items-center justify-center'>
      <LoaderCircle className='animate-spin' size={32} />
    </div>
  )

  return (
    <div className='space-y-6'>
      <section className="relative flex items-center w-full">
        <Search className="absolute left-3 text-muted-foreground" size={16} />
        <Input
          type="search"
          placeholder={"Search by File Name"}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full !pl-9 py-5"
        />
      </section>

      <DataTable
        columns={mediaColumns}
        data={data ?? []}
      />
    </div>
  )
}

