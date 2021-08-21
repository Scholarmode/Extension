import React from "react";
import { useState } from "react";
import Input from "@material-ui/core/OutlinedInput";
import styled from "styled-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const CustomDiv = styled.div`
  margin: 10px;
  color: black;
  input {
    height: 36px;
    padding: 0px 14px;
    padding-left: 0px;
    font-size: 15px;
  }

  label {
    height: 36px;
    top: -10px;
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    input: {
        color: theme.palette.common.black,

        "&:hover $notchedOutline": {
            borderColor: theme.palette.grey[400]
        },
        "&$focused $notchedOutline": {
            borderColor: theme.palette.grey[400]
        }
    },
    notchedOutline: {
        borderColor: theme.palette.grey[400]
    },
    focused: {},
    adornedStart: {
        color: theme.palette.black
    }
}));

export default function AddTagButton({ tagName, setTagName, setNewTag, setArrayTag, arrayTag }) {
    const handleChange = (event) => {
        setTagName(event.target.value);
        console.log(tagName);
    };

    const submitTag = () => {
        console.log("Here")
        let newObj = {
            name: tagName,
            votes: 0,
        };
        let newArray = [];
        newArray.push(newObj);
        for (let j = 0; j < arrayTag.length; j++) {
            newArray.push(arrayTag[j]);
        }
        setArrayTag(newArray);
        setTagName("")
    }
    const classes = useStyles();
    return (
        <CustomDiv>
            <Input
                classes={{
                    root: classes.input,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                    adornedStart: classes.adornedStart
                }}
                onSubmit={submitTag}
                onChange={handleChange}
                value={tagName}
                name="username"
                type="text"
                placeholder="Add a Tag"
                startAdornment={
                    <InputAdornment position="start">
                        <AddIcon style={{ cursor: "pointer" }} onClick={submitTag} />
                    </InputAdornment>
                }
            />
        </CustomDiv>
    );
}