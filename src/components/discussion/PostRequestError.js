import React from 'react'
import styled from 'styled-components';

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    font-size:13px;
    color: red;
    min-width: 389.27px;
`;



function PostRequestError() {
    return (
        <CustomDiv>
            Couldn't post this message. Try again after refreshing
        </CustomDiv>
    )
}

export default PostRequestError
