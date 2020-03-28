import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const useStyles = makeStyles({
  toolbarAbsolute: {
    position: 'absolute !important',
    top: '1.5em !important',
    width: '30em !important',
    borderRadius: '0.25em !important',
    background: '#f3f3f3 !important',
    border: '1px solid #e3e3e3 !important'
  },
  editor: {
    border: '1px solid #e3e3e3',
    borderRadius: '0.25em',
    padding: '0 0.5em',
  }
});

export const EditorComponent = React.memo(({ description }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const html = `<p>Hey this <strong>${description}</strong> 😀</p>`;
    const contentBlock = htmlToDraft(html);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }

  }, [description, setEditorState]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div>
      <Editor
        toolbarClassName={classes.toolbarAbsolute}
        editorClassName={classes.editor}
        // toolbarOnFocus
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'colorPicker'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          }
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </div>
  )
})