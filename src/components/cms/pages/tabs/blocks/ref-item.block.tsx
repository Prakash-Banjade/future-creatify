import { BlockComponentProps } from './blocks'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "react-hook-form";
import { EOrder, ERefRelation } from '../../../../../../types/global.types';
import { Input } from '@/components/ui/input';
import { NUMBER_REGEX_STRING } from '@/CONSTANTS';

const RefItemBlock: React.FC<BlockComponentProps> = ({ name, sectionIdx, blockIdx }) => {
    const form = useFormContext();

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`${name}.ref`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Reference <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                            <FormControl>
                                <SelectTrigger className="w-full py-5">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {
                                    Object.entries(ERefRelation).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>{key}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`${name}.limit`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Limit <span className='text-destructive'>*</span></FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                className='py-5'
                                required
                                pattern={NUMBER_REGEX_STRING}
                                min={1}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`${name}.order`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Order <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                            <FormControl>
                                <SelectTrigger className="w-full py-5">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {
                                    Object.entries(EOrder).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>{key}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    )
}

export default RefItemBlock;