import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root1212: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "10px 0",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: "0 5px",
    color: "red",
    float: "right",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Textbox = (props) => {
  const classes = useStyles();

  const onChange = async (event) => {
    props.onChange(event.target.value);
  };
  const onKeyPress = async (event) => {
    // Handles enter key
    if (event.key == "Enter") {
      event.preventDefault();
      await (props.onSubmit && props.onSubmit());
    }
  };
  const removePlayer = () => {
    console.log(props.placeholder);
  };

  return (
    <Paper component="form" className={classes.root1212}>
      <InputBase
        className={classes.input}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={onChange}
        inputProps={{ "aria-label": "Player 1" }}
        onKeyPress={onKeyPress}
      />

      {/* <Divider className={classes.divider} orientation="vertical" /> */}
      {/* {props.deletable && (
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={removePlayer}
        >
          <ClearIcon />
        </IconButton>
      )} */}
    </Paper>
  );
};
export default Textbox;
