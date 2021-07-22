import React from 'react';
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
		setTitle(e.target.value);
	};
	return (
		<CustomDiv>
			<CustomInput
				type="text"
				placeholder="What's your question ?? "
				onChange={(e) => setTitleText(e)}
			></CustomInput>
		</CustomDiv>
	);
}

export default TitleInput;
