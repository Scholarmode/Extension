import styled from 'styled-components'
import { useState, useMemo, useCallback } from "react";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { withHistory } from "slate-history";
import Prism from "prismjs";
import { Text, Editor, Transforms, createEditor } from "slate";
import { css } from 'emotion';
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-java'


const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: auto;
`;

const QuestionContentText = styled.div`
     font-size: 14px;
`;

const CustomFont = styled.p`
    font-size: 15px;
`;

const CustomCodeStyle = styled.code`
    background-color: #c5c5c5;
    color: black;
    font-size: 15px;
`

const CustomListTag = styled.li`
    margin-left: 18px;
    font-size: 15px;
`;

// const ReplyThread = styled.div`
//    border-left: 2px solid red;
//    display: block;
//    height: 100%;
//    width: 50%;
//    margin-left: 23px;
// `;
// const deserialize = string => {
//     // Return a value array of children derived by splitting the string.
//     return string.split('\n').map(line => {
//       return {
//         children: [{ text: line }],
//       }
//     })
//   }





function ReplyContent({ reply, hasMargin }) {
    console.log("JSON Response: " + JSON.parse(reply))
    let jsonReplyObj = JSON.parse(reply)
    console.log("jsonReplyObj")
    const [value, setValue] = useState(jsonReplyObj)
    console.log("setValue")
    const renderElement = useCallback((props) => <Element {...props} />, []);
    console.log("Element")
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    console.log("Leaf")
    const editor = useMemo(() => withReact(createEditor()), [])
    console.log("useMemo")

    const [language, setLanguage] = useState("js");

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

    return (
        <div>
            <CustomDiv style={hasMargin ? ({ paddingLeft: '10px' }) : ({ paddingLeft: '0px' })}>
                <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
                    <Editable
                        decorate={decorate}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        readOnly={true}
                        autoFocus
                    />
                </Slate>
            </CustomDiv>
        </div>
    )
}

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
            return <CustomListTag {...attributes}>{children}</CustomListTag>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <CustomFont {...attributes}>{children}</CustomFont>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        return (<span
            {...attributes}
            className={css`
                    background-color: hsla(0, 0%, 100%, .5);;
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


export default ReplyContent