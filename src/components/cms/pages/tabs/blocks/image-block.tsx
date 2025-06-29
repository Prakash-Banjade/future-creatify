import { MediaInput, MediaItem } from '@/components/forms/media-field'
import { BlockComponentProps } from './blocks'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from 'react-hook-form'
import { TMediaSchema } from '@/schemas/media.schema'

const ImageBlock: React.FC<BlockComponentProps> = ({ name }) => {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={`${name}.images`}
            render={({ field }) => {
                const value = field.value as TMediaSchema[];

                console.log(value)

                return (
                    <FormItem>
                        <FormLabel>Images <span className='text-destructive'>*</span></FormLabel>
                        <section className='space-y-1'>
                            {
                                Array.isArray(value) && value.map((media, index) => (
                                    <MediaItem
                                        key={index}
                                        media={media}
                                        onRemove={() => {
                                            field.onChange(value.filter((_, i) => i !== index))
                                        }}
                                    />
                                ))

                            }
                        </section>
                        <FormControl>
                            <MediaInput
                                onChange={(value) => {
                                    field.onChange(Array.isArray(value) ? [...field.value, ...value] : [...field.value, value])
                                }}
                                max={3}
                            />

                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}

export default ImageBlock;