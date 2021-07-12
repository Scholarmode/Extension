import { Avatar } from "@material-ui/core";

function UserImage({ userName, userImage }) {
    return (
        <div>
            <Avatar alt={userName} src={userImage} />
        </div>
    )
}

export default UserImage
