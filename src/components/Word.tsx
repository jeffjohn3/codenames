import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import { setWordsAction } from "@/redux/actions/game";
import { colors } from "@/consts/colors";
import { database } from "@/services/firebase";
import { nextTeam } from "@/services/game";

const isSpymaster = (team) => {
  return team == "blueSpymaster" || team == "redSpymaster";
};

const getBackgroundColor = (props) => {
  return isSpymaster(props.userTeam) || props.word.flipped
    ? colors[props.word.color]
    : colors.GREY;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "17%",
    padding: "4% 4px",
    margin: ".5% .5%",
    display: "inline-block",
    alignItems: "center",
    textAlign: "center",
    fontSize: "1.5em",
    color: (props: any) => {
      const backgroundColor = getBackgroundColor(props);
      return backgroundColor == colors.GREY || backgroundColor == colors.BEIGE
        ? "black"
        : "white";
    },
    backgroundColor: (props: any) => getBackgroundColor(props),
    "&:hover": {
      cursor: "pointer",
    },
  },
  iconButton: {
    padding: "0 5px",
    color: "red",
    float: "right",
  },
}));

const Word = ({ word, roomId, userTeam, index, words, currentTeam }) => {
  const classes = useStyles({ word, userTeam });

  const onClick = async () => {
    if (currentTeam == userTeam && !isSpymaster(userTeam)) {
      await database.ref(`rooms/${roomId}/words/${index}`).update({
        ...words[index],
        flipped: true,
      });
      if (word.color == "BLACK") {
        // end game
      } else if (
        (userTeam == "redOperatives" && word.color != "RED") ||
        (userTeam == "blueOperatives" && word.color != "BLUE")
      ) {
        nextTeam(currentTeam);
      }
    }
  };

  return (
    <a onClick={onClick}>
      <Paper className={classes.paper}>
        {word.word}
        {/* <div>{word.word}</div> */}
        {/* <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          // onClick={removePlayer}
        >
          <ClearIcon />
        </IconButton> */}
      </Paper>
    </a>
  );
};

const mapStateToProps = (state) => ({
  words: state.game.words,
  userTeam: state.joinRoom.userTeam,
  roomId: state.config.roomId,
  currentTeam: state.game.currentTeam,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Word);
