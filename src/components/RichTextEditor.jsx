import { useRef, useEffect } from 'react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, placeholder = 'Start writing...' }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const changeColor = (e) => {
    execCommand('foreColor', e.target.value);
  };

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="toolbar-btn"
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="toolbar-btn"
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="toolbar-btn"
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => execCommand('strikeThrough')}
            className="toolbar-btn"
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h1')}
            className="toolbar-btn"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h2')}
            className="toolbar-btn"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h3')}
            className="toolbar-btn"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'p')}
            className="toolbar-btn"
            title="Paragraph"
          >
            P
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('justifyLeft')}
            className="toolbar-btn"
            title="Align Left"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyCenter')}
            className="toolbar-btn"
            title="Align Center"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyRight')}
            className="toolbar-btn"
            title="Align Right"
          >
            ➡
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="toolbar-btn"
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="toolbar-btn"
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={insertLink}
            className="toolbar-btn"
            title="Insert Link"
          >
            🔗 Link
          </button>
          <button
            type="button"
            onClick={() => execCommand('unlink')}
            className="toolbar-btn"
            title="Remove Link"
          >
            ⛓️‍💥
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <label className="color-picker-label" title="Text Color">
            🎨
            <input
              type="color"
              onChange={changeColor}
              className="color-picker"
            />
          </label>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('removeFormat')}
            className="toolbar-btn"
            title="Clear Formatting"
          >
            ✖ Clear
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        onInput={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
