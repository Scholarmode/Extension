import { Avatar } from "@material-ui/core";
import React from "react";

function UserImage({ userName, userImage }) {
    return (
        <div>
            <Avatar alt={userName} src={userImage} />
        </div>
    )
}

export default UserImage
