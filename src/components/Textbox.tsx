import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { StyleRules, withStyles } from "@material-ui/core/styles";

const Textbox = (props) => {
  // const classes = useStyles();
  const { classes } = props;

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
    <InputBase
      className={classes.input}
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
      onChange={onChange}
      inputProps={{ "aria-label": "Player 1" }}
      onKeyPress={onKeyPress}
      style={{ padding: "4px 26px 3px 12px" }}
    />
  );
};

const TextboxWithStyles = withStyles((theme) => ({
  input: {
    // padding: "10px 10px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 26px 10px 12px",
    margin: "5px 0 5px 0",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Courier",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(Textbox);

export default TextboxWithStyles;
