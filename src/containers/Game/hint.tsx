import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import _ from "lodash";

import { nextTeam, setHints } from "@/services/game";
import Textbox from "@/components/Textbox";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import EndTurn from "@/containers/Game/endTurn";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { StyleRules, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { colors } from "@/consts/colors";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: 3,
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 26px 10px 12px",
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
}))(InputBase);

const styles = (theme) =>
  ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing.unit,
    },
    bootstrapFormLabel: {
      fontSize: 18,
    },
  } as StyleRules);

const isSpymaster = (team) => {
  return team == "blueSpymaster" || team == "redSpymaster";
};

const Hint = ({ currentTeam, userTeam, hints, classes }) => {
  const [hintValue, setHintValue] = useState("");
  const [countValue, setCountValue] = useState(0);

  const onClick = async () => {
    await nextTeam(currentTeam);
    await setHints(
      _.concat(hints || [], {
        word: hintValue,
        count: countValue,
      }),
    );
  };

  const hintStyle = {
    display: "inline-block",
    color: currentTeam == "redOperatives" ? colors.RED : colors.BLUE,
  };

  if (!isSpymaster(userTeam)) {
    const lastHint = hints[hints.length - 1];
    return (
      <React.Fragment>
        <Row>
          <Col xs={{ size: 5, offset: 1 }} md={{ size: 12, offset: 0 }}>
            <div
              style={{
                fontSize: "4em",
                fontFamily: "Courier",
                textAlign: "center",
                // display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              <p style={{ ...hintStyle, marginRight: "6%" }}>{lastHint.word}</p>
              <p style={hintStyle}> {lastHint.count} </p>
              {/* {`${lastHint.word} ${lastHint.count}`} */}
            </div>
            <p style={{ fontSize: "4em", fontFamily: "Courier" }}></p>
          </Col>
        </Row>
        <Row>
          <Col>
            <EndTurn />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  return (
    <Row style={{ alignItems: "center" }}>
      <Col
        xs={{ size: 10, offset: 1 }}
        md={{ size: 3, offset: 3 }}
        style={{ textAlign: "center" }}
      >
        <Textbox
          value={hintValue}
          placeholder="Enter a hint"
          onChange={setHintValue}
          onSubmit={onClick}
        />
      </Col>
      <Col
        xs={{ size: 2, offset: 0 }}
        md={{ size: 1, offset: 0 }}
        style={{ textAlign: "center" }}
      >
        <FormControl className={classes.margin}>
          <Select
            value={countValue}
            onChange={(event: any) => setCountValue(event.target.value)}
            input={<BootstrapInput name="age" id="age-customized-select" />}
          >
            {_.range(10).map((int) => {
              return <MenuItem value={int}>{int}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Col>
      <Col xs={{ size: 10, offset: 1 }} md={{ size: 2, offset: 0 }}>
        <ButtonWithLoading
          color="primary"
          // loading={createLoading}
          onClick={onClick}
          block
        >
          Enter
        </ButtonWithLoading>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  currentTeam: state.game.currentTeam,
  userTeam: state.joinRoom.userTeam,
  hints: state.game.hints,
});

export default withStyles(styles)(connect(mapStateToProps)(Hint));
