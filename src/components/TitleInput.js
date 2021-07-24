import {useState, useEffect} from 'react'
import styled from 'styled-components';

const CustomDiv = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	flex-direction: column;
`;

const CustomInput = styled.input`
	border-radius: 5px;
	border: 1px solid grey;
	padding: 5px !important;
	height: 30px;
	margin-bottom: 10px;
	font-size: 16px;
`;

function TitleInput({ title, setTitle }) {
    const setTitleText = (e) => {
        console.log(e.target.value)
        setTitle(e.target.value)
    }


    const [focus, setFocus] = useState(false)


    var hotkeys = document.getElementsByTagName('yt-Hotkey-Manager')[0]
    var hotkeysParent = hotkeys ? hotkeys.parentNode : false;

    function addYouTubeHotkeys() {
        if (hotkeysParent)
            hotkeysParent.appendChild(hotkeys);
    }

    function removeYoutubeHotkeys() {
        var x = document.getElementsByTagName('yt-Hotkey-Manager')[0]
        if (x) {
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
    })

    return (
        <CustomDiv>
            <CustomInput
                type="text"
                placeholder="What's your question ?? "
                onChange={(e) => setTitleText(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}></CustomInput>
        </CustomDiv>
    )
}

export default TitleInput;
