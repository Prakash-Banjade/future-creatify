import React, { useMemo, useState } from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn, createQueryString } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SelectOption } from '../../../../../../types/global.types';
import { useInternalLinks } from './internal-links';

type Props = {
    onChange: (value: string) => void
    selected?: SelectOption
}

export function InternalLinkField({
    onChange,
    selected
}: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<string>('');

    const debouncedValue = useDebounce(search, 500);

    const [selectedValue, setSelectedValue] = useState<Props["selected"]>(selected);

    const queryString = useMemo(() => createQueryString({ q: debouncedValue, pageSize: "20" }), [debouncedValue]);

    const { isLoading, data } = useInternalLinks(queryString);

    return (
        <FormItem>
            <FormLabel>Document to link to <span className='text-destructive'>*</span></FormLabel>

            <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="hover:bg-secondary/20">
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between overflow-hidden disabled:!cursor-not-allowed disabled:pointer-events-auto"
                        >
                            <span className='truncate font-normal'>{selectedValue?.label ?? 'Select a value...'}</span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="!min-w-full p-0">
                        <Command shouldFilter={false}>
                            <CommandInput placeholder={"Select a value"} onValueChange={val => setSearch(val)} />
                            <CommandEmpty>No results found.</CommandEmpty>
                            {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
                            <CommandGroup>
                                <CommandList>
                                    {data.map((group) => {
                                        return !!group.options?.data?.length && (
                                            <CommandGroup className='capitalize' heading={group.label} key={group.label}>
                                                {group.options?.data.map((option) => {
                                                    return (
                                                        <CommandItem
                                                            key={option.value}
                                                            value={group.label === 'pages' ? `/${option.value}` : `/${group.label}/${option.value}`}
                                                            onSelect={(currentValue) => {
                                                                onChange(currentValue)
                                                                setSelectedValue(option)
                                                                setOpen(false)
                                                            }}
                                                            className='justify-between'
                                                        >
                                                            <div className='truncate'>
                                                                {option.label}
                                                            </div>

                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    selectedValue?.value === option.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    )
                                                })}
                                            </CommandGroup>
                                        )
                                    })}
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </FormControl>

            <FormMessage />
        </FormItem>
    );
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}