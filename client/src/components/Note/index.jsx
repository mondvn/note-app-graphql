import { useEffect, useState } from "react";
import {
  EditorState,
  convertFromHTML,
  convertToRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHTML from "draftjs-to-html";

function Note() {
  console.log("Re-rendering Note");
  const note = {
    id: 1,
    content: "<p>This is first note</p>",
  };

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  const handleOnChange = (e) => {
    console.log(e);
    setEditorState(e);
    setRawHTML(draftToHTML(convertToRaw(e.getCurrentContent())));
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeHolder="Write Something..."
    />
  );
}

export default Note;
