import {
    InitialConfigType,
    LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { editorTheme } from "../../themes/editor-theme"
import { SerializedEditorState } from "lexical"

const editorConfig: InitialConfigType = {
    namespace: "Editor Preview",
    theme: editorTheme,
    nodes: [],
    editable: false,
    onError: (error: Error) => {
        console.error(error)
    },
}

type Props = {
    className?: string
    value: SerializedEditorState
}

export function RichTextPreview({ className, value }: Props) {
    return (
        <div className={className}>
            <LexicalComposer
                initialConfig={{
                    ...editorConfig,
                    editorState: JSON.stringify(value)
                }}
            />
        </div>
    )
}