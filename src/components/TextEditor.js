import React, { useCallback, useMemo, useState, useEffect } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { Button, Icon, Toolbar } from "./TextEditorComponents";


const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
};

const CustomTimeInput = styled.input`
  width: 20px;
  text-align: center;
  margin-left: 1px;
  border: 0px;
  font-size: 15px;
  color: #2196f3;
  background: none;

  ::placeholder {
    color: #2196f3;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ClockIcon = styled(AccessTimeIcon)`
  margin-top: -10px;
  color: #eee;
`;

const FontBigDiv = styled.div`
    font-size: 16px;
`;



const LIST_TYPES = ["numbered-list", "bulleted-list"];

const TextEditor = ({ value, setValue }) => {
    // const [value, setValue] = useState(initialValue);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const [focus, setFocus] = useState(false)
    const [originalChild, setOriginalChild] = useState(null)
    const [parentNode, setParentNode] = useState(null)



    // var hotkeys = document.getElementsByTagName('yt-Hotkey-Manager')[0] ? originalChild
    // var hotkeysParent = hotkeys ? hotkeys.parentNode : false;

    function addYouTubeHotkeys() {
        let hotkeys;
        let hotkeysParent;
        if (originalChild == null) {
            hotkeys = document.getElementsByTagName('yt-Hotkey-Manager')[0]
        } else {
            hotkeys = originalChild
        }
        if (parentNode == null) {
            hotkeysParent = hotkeys ? hotkeys.parentNode : false;
        }
        else {
            hotkeysParent = parentNode
        }
        if (hotkeysParent) {
            hotkeysParent.appendChild(hotkeys);
        }
    }

    function removeYoutubeHotkeys() {
        var x = document.getElementsByTagName('yt-Hotkey-Manager')[0]
        if (x) {
            setOriginalChild(x.cloneNode(false))
            setParentNode(x.parentNode)
            var clone = x.cloneNode(false)
            x.parentNode.replaceChild(clone, x)
            clone.parentNode.removeChild(clone)
        }
    }

    useEffect(() => {
        if (focus) {
            removeYoutubeHotkeys()
        }
        else {
            addYouTubeHotkeys()
        }
    }, [focus])


    return (
        <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
            <Toolbar>
                <CustomTimeInput type="number" placeholder="00"></CustomTimeInput>
                <p>:</p>
                <CustomTimeInput type="number" placeholder="00"></CustomTimeInput>
                <MarkButton format="bold" icon="format_bold" />
                <MarkButton format="italic" icon="format_italic" />
                <MarkButton format="underline" icon="format_underlined" />
                <MarkButton format="code" icon="code" />
                <BlockButton format="block-quote" icon="format_quote" />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" />
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onFocus={() => {
                    setFocus(true)
                }}
                onBlur={() => {
                    setFocus(false)
                }}
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault();
                            const mark = HOTKEYS[hotkey];
                            toggleMark(editor, mark);
                        }
                    }
                }}
            />
        </Slate>
    );
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) => LIST_TYPES.includes(n.type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => n.type === format
    });

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <h2 {...attributes}>{children}</h2>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    let element;
    if (icon == "format_quote") {
        element = <FormatQuoteIcon />
    }
    else {
        element = <FormatListBulletedIcon />
    }
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {element}
        </Button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    let elementIcon;
    if (icon == "format_bold") {
        elementIcon = <FormatBoldIcon />
    }
    else if (icon == "format_italic") {
        elementIcon = <FormatItalicIcon />
    }
    else if (icon == "format_underlined") {
        elementIcon = <FormatUnderlinedIcon />
    }
    else if (icon == "code") {
        elementIcon = <CodeIcon />
    }

    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {elementIcon}
            {/* <Icon>{icon}</Icon> */}
        </Button>
    );
};

const initialValue = [];

export default TextEditor;