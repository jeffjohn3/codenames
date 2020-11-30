import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";

import "@/services/firebase";
import {
  setCurrentTeamAction,
  setStateAction,
  setWordsAction,
} from "@/redux/actions/game";
import { database } from "@/services/firebase";
import { setPlayersAction } from "@/redux/actions/config";
import JoinRoom from "@/containers/App/joinRoom";
import Players from "@/containers/App/players";
import Game from "@/containers/Game/game";
import CodenamesIcon from "@/components/CodenamesIcon";
import { GAME_STATES } from "@/consts/game";

const useStyles = makeStyles((theme) => ({}));

const App = ({
  roomId,
  state,
  roomConnected,
  setPlayers,
  setWords,
  setState,
  setCurrentTeam,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (roomConnected) {
      const roomRef = database.ref(`/rooms/${roomId}`);
      roomRef.on("value", (roomRefSnapshot) => {
        setPlayers(roomRefSnapshot.val()?.players);
        setWords(roomRefSnapshot.val()?.words);
        setCurrentTeam(roomRefSnapshot.val()?.currentTeam);
        setState(roomRefSnapshot.val()?.val);
      });

      return () => roomRef.off();
    }

    setPlayers({});
  }, [roomConnected]);

  return (
    <Container>
      <Row>
        <Col
          xs={{ size: 12, offset: 2 }}
          md={{ size: 12, order: 1, offset: 2 }}
        >
          <h1
            style={{
              fontWeight: "normal",
              fontSize: "3em",
              fontFamily: "Courier",
              marginTop: "5%",
              marginBottom: "3%",
            }}
          >
            <CodenamesIcon />
            CODENAMES
          </h1>
        </Col>
      </Row>
      {roomConnected && state == GAME_STATES.NEW && <Players />}
      {roomConnected && state == GAME_STATES.NEW && <JoinRoom />}
      {roomConnected && state != GAME_STATES.NEW && <Game />}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  roomId: state.config.roomId,
  roomConnected: state.session.roomConnected,
  state: state.game.state,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayers: (players) => dispatch(setPlayersAction(players)),
  setWords: (words) => dispatch(setWordsAction(words)),
  setCurrentTeam: (team) => dispatch(setCurrentTeamAction(team)),
  setState: (state) => dispatch(setStateAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
