import { useState } from 'react'
import styled from 'styled-components'
import AddTagButton from './AddTagButton';
import Tag from './Tag';

const TagContainer = styled.div`
  height: 60px;
  width: 174px;
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 6px 6px 0px 0px;
  position: relative;
  padding-bottom: 10px;
  margin-right: 10px;
  overflow: scroll;

  overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 8px 8px 8px 8px;
        background-color: darkgray;
        visibility: hidden;
    }

    :hover::-webkit-scrollbar-thumb {
        visibility: visible;
    }

    ::-webkit-scrollbar-track {
    background-color: white;
    margin-top: 2px;
    margin-bottom: 2px;
    border-radius: 8px 8px 0px 0px;
  }
`;


function VotedTagContainer() {
    const [arrayTag, setArrayTag] = useState([
        {
            name: "Awesome",
            votes: 242
        },
        {
            name: "Clever",
            votes: 42
        }
    ]);
    const [newTag, setNewTag] = useState(false)
    const [tagName, setTagName] = useState("");

    // const updateArray = () => {
    //     console.log(newTag);
    //     if (newTag) {
    //         console.log("Here")
    //         let newObj = {
    //             name: tagName,
    //             votes: 0,
    //         };
    //         setArrayTag(arrayTag.concat(newObj));
    //     }
    // }
    return (
        <div>
            <TagContainer>
                <AddTagButton tagName={tagName} setTagName={setTagName} setNewTag={setNewTag} setArrayTag={setArrayTag} arrayTag={arrayTag} />
                {arrayTag.map((v) => {
                    return (<Tag clickedOrNot={false} voteName={v.name} votes={v.votes} />);
                })}
            </TagContainer>
        </div>
    )
}

export default VotedTagContainer
