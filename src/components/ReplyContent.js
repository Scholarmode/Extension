import styled from 'styled-components'
import { useState, useMemo, useCallback } from "react";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { withHistory } from "slate-history";
import { Editor, Transforms, createEditor } from "slate";

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
    const ref = editor => {
        this.editor = editor
    }
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
    return (
        <div>
            <CustomDiv style={hasMargin ? ({ paddingLeft: '10px' }) : ({ paddingLeft: '0px' })}>
                <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
                    <Editable
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
        children = <CustomCodeStyle>{children}</CustomCodeStyle>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};


export default ReplyContent