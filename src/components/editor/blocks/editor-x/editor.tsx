"use client"

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { SerializedEditorState } from "lexical"

import { FloatingLinkContext } from "../../context/floating-link-context"
import { SharedAutocompleteContext } from "../../context/shared-autocomplete-context"
import { editorTheme } from "../../themes/editor-theme"
import { TooltipProvider } from "@/components/ui/tooltip"

import { nodes } from "./nodes"
import { EditorPluginProps, Plugins } from "./plugins"

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error)
  },
}

export const initialValue = {
  root: {
    children: [],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState


type EditorProps = {
  value?: SerializedEditorState
  onChange?: (editorSerializedState: SerializedEditorState) => void
} & EditorPluginProps

export function Editor({
  value,
  onChange,
  ...editorPluginProps
}: EditorProps) {
  console.log(editorPluginProps.className)
  
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(value ? { editorState: JSON.stringify(value || initialValue) } : {}),
        }}
      >
        <TooltipProvider>
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              <Plugins {...editorPluginProps} />

              <OnChangePlugin
                ignoreSelectionChange={true}
                onChange={(editorState) => {
                  onChange?.(editorState.toJSON())
                }}
              />
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}
