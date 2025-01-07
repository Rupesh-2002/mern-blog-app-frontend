import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import React from "react";
import { extensions } from "../../constants/tiptap/tiptapExtensions";
import '../../constants/tiptap/styles.css'

const Editor = ({ onDataChange, content, editable }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "text-black text-xl dark:prose-invert prose-sm sm:prose-base mt-7 max-w-none focus:outline-none prose-pre:bg-black prose-pre:text-black",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className="w-full relative">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
