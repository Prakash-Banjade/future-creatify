"use client"

import { EditorBubble, EditorCommand, EditorCommandEmpty, EditorCommandItem, EditorCommandList, EditorContent, EditorRoot, JSONContent } from "novel";
import { useState } from "react";
import { slashCommand, suggestionItems } from "./slash-commands";
import { defaultExtensions } from "./default-extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";

const extensions = [...defaultExtensions, slashCommand];

export default function NovelEditor() {
    const [content, setContent] = useState<JSONContent | undefined>(undefined);
    const [openNode, setOpenNode] = useState<boolean>(false);
    const [openLink, setOpenLink] = useState<boolean>(false);
    const [openColor, setOpenColor] = useState<boolean>(false);

    return (
        <EditorRoot>
            <EditorContent
                extensions={extensions}
                initialContent={content}
                onUpdate={({ editor }) => {
                    const json = editor.getJSON();
                    setContent(json);
                }}
                editorProps={{
                    attributes: {
                        class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full border border-input rounded-md shadow-xs p-3 text-sm min-h-[200px]`,
                    }
                }}
            >
                <EditorCommand className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
                    <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
                    <EditorCommandList>
                        {suggestionItems.map((item) => (
                            <EditorCommandItem
                                value={item.title}
                                onCommand={(val) => {
                                    console.log('hit ')
                                    item.command && item.command(val);
                                }}
                                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                                key={item.title}>
                                <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className='font-medium'>{item.title}</p>
                                    <p className='text-xs text-muted-foreground'>{item.description}</p>
                                </div>
                            </EditorCommandItem>
                        ))}
                    </EditorCommandList>
                </EditorCommand>

                <div>
                    <EditorBubble
                        tippyOptions={{
                            // placement: openAI ? "bottom-start" : "top",
                            placement: false ? "bottom-start" : "top",
                        }}
                        className='flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl'>
                        <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                        <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                        <TextButtons />
                        <ColorSelector isOpen={openColor} setIsOpen={setOpenColor} open={openColor} onOpenChange={setOpenColor} />
                    </EditorBubble>
                </div>
            </EditorContent>
        </EditorRoot>
    )
}