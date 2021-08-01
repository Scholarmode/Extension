import { useState, useEffect } from 'react'
import styled from 'styled-components';

const CustomDiv = styled.div`
	width: 419.25px;
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
        setTitle(e.target.value)
    }


    const [focus, setFocus] = useState(false)
    const [originalChild, setOriginalChild] = useState(null)
    const [parentNode, setParentNode] = useState(null)


    // var hotkeys = document.getElementsByTagName('yt-Hotkey-Manager')[0]
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
