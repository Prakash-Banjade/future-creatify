import { Button } from '@/components/ui/button';
import { TPageDto } from '@/schemas/page.schema';
import { Plus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import Image from 'next/image';
import { heroLayouts } from '@/lib/layouts/hero-layouts';
import { THeroSectionDto } from '@/schemas/hero-section.schema';

type Props = {
    onSelect: (layout: THeroSectionDto["layout"]) => void,
    length: number
}

export default function AddHeroSectionDialog({ onSelect, length }: Props) {
    const [selectorOpen, setSelectorOpen] = useState(false);

    function handleAdd(layout: THeroSectionDto["layout"]) {
        if (length >= 5) return;
        onSelect(layout);
        setSelectorOpen(false);
    }

    return (
        <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
            <DialogTrigger asChild>
                {
                    length < 5 && (
                        <Button
                            type="button"
                            variant={"outline"}
                            size={"sm"}
                            className="font-normal text-xs"
                            disabled={length >= 5}
                        >
                            <Plus size={16} /> Add Hero
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className='full-screen-dialog block'>
                <DialogHeader>
                    <DialogTitle>
                        <span id="dialog-title">Add Hero</span>
                    </DialogTitle>
                </DialogHeader>
                <section className='pt-10 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6'>
                    {
                        heroLayouts.map((l, ind) => {
                            return (
                                <section
                                    key={ind}
                                    role='button'
                                    className='border rounded-md p-4 space-y-2 hover:ring-1 hover:ring-offset-2 transition-all cursor-pointer'
                                    onClick={() => handleAdd(l.layout)}
                                >
                                    <Image
                                        src={l.image}
                                        alt={l.alt}
                                        width={200}
                                        height={200}
                                        className='w-full rounded-md'
                                    />
                                    <p className='text-sm text-center'>{l.alt}</p>
                                </section>
                            )
                        })
                    }
                </section>
            </DialogContent>
        </Dialog>
    )
}