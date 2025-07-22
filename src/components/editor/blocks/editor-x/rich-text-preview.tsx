import { SerializedEditorState } from "lexical"
import { lexicalJsonToHtml } from "../../utils/lexical-json-to-html"
import DOMPurify from 'dompurify';

type Props = {
    className?: string
    value: SerializedEditorState
}

export function RichTextPreview({ className, value }: Props) {
    const html = lexicalJsonToHtml(JSON.stringify(value));

    return (
        <div className={className} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
    )
}