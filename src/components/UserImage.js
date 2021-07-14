import { Avatar } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

function UserImage({ userName, userImage }) {
   
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Avatar alt={userName} src={userImage} className={classes.small} />
        </div>
    )
}

export default UserImage
