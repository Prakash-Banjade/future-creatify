import { JSDOM } from 'jsdom';
import { createHeadlessEditor } from '@lexical/headless';
import { $generateHtmlFromNodes } from '@lexical/html';
import { nodes } from '../blocks/editor-x/nodes';

export function lexicalJsonToHtml(serializedJson: string): string {
    // create headless editor with nodes
    const editor = createHeadlessEditor({
        namespace: 'ssr',
        nodes: nodes,
        onError(error) {
            throw error;
        },
    });

    // parse and set editor state
    const editorState = editor.parseEditorState(serializedJson);
    editor.setEditorState(editorState);

    // shim DOM globals for headless HTML export
    const dom = new JSDOM(`<!doctype html><html><body></body></html>`);
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
    (global as any).DocumentFragment = dom.window.DocumentFragment;

    // generate html
    let html = '';
    editor.update(() => {
        html = $generateHtmlFromNodes(editor, null);
    });

    return html;
}