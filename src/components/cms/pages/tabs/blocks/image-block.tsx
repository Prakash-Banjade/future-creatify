import MediaField from '@/components/forms/media-field'
import CloudinaryImage from '@/components/ui/cloudinary-image'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { formatBytes } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { BlockComponentProps } from './blocks'

const ImageBlock: React.FC<BlockComponentProps> = ({ name }) => {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                console.log(field.value)

                return (
                    <FormItem>
                        <FormLabel>Image <span className='text-destructive'>*</span></FormLabel>
                        <FormControl>
                            {
                                !!field.value.secure_url ? (
                                    <section className="border rounded-md p-3 flex items-center justify-between gap-4">
                                        <section>
                                            <CloudinaryImage
                                                src={field.value.secure_url}
                                                alt={field.value.alt ?? ""}
                                                width={50}
                                                height={50}
                                            />
                                            <section className="text-sm">
                                                <p>{field.value.name}</p>
                                                <p className="text-muted-foreground">{formatBytes(field.value.bytes)}</p>
                                            </section>
                                        </section>

                                        <section>

                                        </section>
                                    </section>
                                ) : (
                                    <MediaField onChange={val => {
                                        field.onChange(val);
                                    }} />
                                )
                            }

                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}

export default ImageBlock;