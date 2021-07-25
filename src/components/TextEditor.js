import React, { useCallback, useMemo, useState, useEffect } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Text, Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Prism from "prismjs";
import { Button, Icon, Toolbar } from "./TextEditorComponents";
import { css } from 'emotion';
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-java'


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
  font-size: 18px;
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

const CustomFont = styled.p`
    font-size: 15px;
`;

const ClockIcon = styled(AccessTimeIcon)`
  margin-top: -10px;
  color: #eee;
`;

const FontBigDiv = styled.div`
    font-size: 16px;
`;

const CustomCodeStyle = styled.code`
    background-color: #c5c5c5;
    color: black;
`

const MyToolbar = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MySlate = styled(Slate)`
    background-color: white;
`


const LIST_TYPES = ["numbered-list", "bulleted-list"];

const TextEditor = ({ value, setValue }) => {
    // const [value, setValue] = useState(initialValue);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const [focus, setFocus] = useState(false)
    const [originalChild, setOriginalChild] = useState(null)
    const [parentNode, setParentNode] = useState(null)

    const [language, setLanguage] = useState("html");

    // decorate function depends on the language selected
    const decorate = useCallback(
        ([node, path]) => {
            const ranges = [];
            if (!Text.isText(node)) {
                return ranges;
            }
            const tokens = Prism.tokenize(node.text, Prism.languages[language]);
            let start = 0;

            for (const token of tokens) {
                const length = getLength(token);
                const end = start + length;

                if (typeof token !== "string") {
                    ranges.push({
                        [token.type]: true,
                        anchor: { path, offset: start },
                        focus: { path, offset: end }
                    });
                }

                start = end;
            }

            return ranges;
        },
        [language]
    );



    const getLength = (token) => {
        if (typeof token === "string") {
            return token.length;
        } else if (typeof token.content === "string") {
            return token.content.length;
        } else {
            return token.content.reduce((l, t) => l + getLength(t), 0);
        }
    };
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
        <MySlate editor={editor} value={value} onChange={(value) => setValue(value)}>
            <MyToolbar>
                <CustomTimeInput type="number" placeholder="00"></CustomTimeInput>
                <p>:</p>
                <CustomTimeInput type="number" placeholder="00"></CustomTimeInput>
                <MarkButton format="bold" icon="format_bold" />
                <MarkButton format="italic" icon="format_italic" />
                <MarkButton format="underline" icon="format_underlined" />
                <MarkButton format="code" icon="code" />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                <div>
                    <select
                        value={language}
                        style={{ float: "right" }}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="js">JavaScript</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                        <option value="python">Python</option>
                        <option value="sql">SQL</option>
                        <option value="java">Java</option>
                        <option value="php">PHP</option>
                    </select>
                </div>
            </MyToolbar>
            <Editable
                decorate={decorate}
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
        </MySlate>
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
            return <CustomFont {...attributes}>{children}</CustomFont>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {

    // return (
    //     <span
    //         {...attributes}
    //         className={css`
    //         ${leaf.comment &&
    //             css`
    //             color: slategray;
    //           `} 
    //         ${(leaf.operator || leaf.url) &&
    //             css`
    //             color: #9a6e3a;
    //           `}
    //         ${leaf.keyword &&
    //             css`
    //             color: #07a;
    //           `}
    //         ${(leaf.variable || leaf.regex) &&
    //             css`
    //             color: #e90;
    //           `}
    //         ${(leaf.number ||
    //                 leaf.boolean ||
    //                 leaf.tag ||
    //                 leaf.constant ||
    //                 leaf.symbol ||
    //                 leaf['attr-name'] ||
    //                 leaf.selector) &&
    //             css`
    //             color: #905;
    //           `}
    //         ${leaf.punctuation &&
    //             css`
    //             color: #999;
    //           `}
    //         ${(leaf.string || leaf.char) &&
    //             css`
    //             color: #690;
    //           `}
    //         ${(leaf.function || leaf['class-name']) &&
    //             css`
    //             color: #dd4a68;
    //           `}
    //         `}
    //     >
    //         {children}
    //     </span>
    // )

    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        return (<span
            {...attributes}
            className={css`
                    font-family: monospace;
                    background: hsla(0, 0%, 100%, .5);
                ${leaf.comment &&
                css`
                    color: slategray;
                  `} 
                ${(leaf.operator || leaf.url) &&
                css`
                    color: #9a6e3a;
                  `}
                ${leaf.keyword &&
                css`
                    color: #07a;
                  `}
                ${(leaf.variable || leaf.regex) &&
                css`
                    color: #e90;
                  `}
                ${(leaf.number ||
                    leaf.boolean ||
                    leaf.tag ||
                    leaf.constant ||
                    leaf.symbol ||
                    leaf['attr-name'] ||
                    leaf.selector) &&
                css`
                    color: #905;
                  `}
                ${leaf.punctuation &&
                css`
                    color: #999;
                  `}
                ${(leaf.string || leaf.char) &&
                css`
                    color: #690;
                  `}
                ${(leaf.function || leaf['class-name']) &&
                css`
                    color: #dd4a68;
                  `}
                `}
        >
            {children}
        </span>);
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    if (leaf.comment) {
        children = css` 
            color: slategray;
         `
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    let element;
    if (icon == "format_quote") {
        element = <FormatQuoteIcon style={{ fontSize: "20px", display: "flex", justifyContent: "center" }} />
    }
    else {
        element = <FormatListBulletedIcon style={{ fontSize: "20px", display: "flex", justifyContent: "center" }} />
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
        elementIcon = <FormatBoldIcon style={{ fontSize: "20px", display: "flex", justifyContent: "center" }} />
    }
    else if (icon == "format_italic") {
        elementIcon = <FormatItalicIcon style={{ fontSize: "20px", display: "flex", justifyContent: "center" }} />
    }
    else if (icon == "format_underlined") {
        elementIcon = <FormatUnderlinedIcon style={{ fontSize: "20px", display: "flex", justifyContent: "center" }} />
    }
    else if (icon == "code") {
        elementIcon = <CodeIcon style={{ fontSize: "20px", display: "flex", justifyContent: "center" }} />
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

Prism.languages.python = Prism.languages.extend('python', {})
Prism.languages.insertBefore('python', 'prolog', {
    comment: { pattern: /##[^\n]*/, alias: 'comment' },
})
Prism.languages.javascript = Prism.languages.extend('javascript', {})
Prism.languages.insertBefore('javascript', 'prolog', {
    comment: { pattern: /\/\/[^\n]*/, alias: 'comment' },
})
Prism.languages.html = Prism.languages.extend('html', {})
Prism.languages.insertBefore('html', 'prolog', {
    comment: { pattern: /<!--[^\n]*-->/, alias: 'comment' },
})
Prism.languages.markdown = Prism.languages.extend('markup', {})
Prism.languages.insertBefore('markdown', 'prolog', {
    blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
    code: [
        { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
        { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
    ],
    title: [
        {
            pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
            alias: 'important',
            inside: { punctuation: /==+$|--+$/ },
        },
        {
            pattern: /(^\s*)#+.+/m,
            lookbehind: !0,
            alias: 'important',
            inside: { punctuation: /^#+|#+$/ },
        },
    ],
    hr: {
        pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: !0,
        alias: 'punctuation',
    },
    list: {
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: !0,
        alias: 'punctuation',
    },
    'url-reference': {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
            variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/,
        },
        alias: 'url',
    },
    bold: {
        pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
    },
    italic: {
        pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: { punctuation: /^[*_]|[*_]$/ },
    },
    url: {
        pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
        inside: {
            variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
            string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
        },
    },
})
Prism.languages.markdown.bold.inside.url = Prism.util.clone(
    Prism.languages.markdown.url
)
Prism.languages.markdown.italic.inside.url = Prism.util.clone(
    Prism.languages.markdown.url
)
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
    Prism.languages.markdown.italic
)
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);

export default TextEditor;