import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";

import "@/services/firebase";
import {
  resetGameAction,
  setCurrentTeamAction,
  setGameAction,
  setHintsAction,
  setStateAction,
  setWordsAction,
} from "@/redux/actions/game";
import { database } from "@/services/firebase";
import { resetConfigAction, setPlayersAction } from "@/redux/actions/config";
import JoinRoom from "@/containers/App/joinRoom";
import Players from "@/containers/App/players";
import Game from "@/containers/Game/game";
import CodenamesIcon from "@/components/CodenamesIcon";
import LeaveGame from "@/containers/Game/leaveGame";
import { GAME_STATES } from "@/consts/game";
import {
  resetSessionAction,
  setRoomConnectedAction,
} from "@/redux/actions/session";
import { resetGame } from "@/services/game";
import { resetJoinRoomAction } from "@/redux/actions/joinRoom";

const useStyles = makeStyles((theme) => ({}));

const App = ({
  roomId,
  state,
  roomConnected,
  resetConfig,
  resetGame,
  resetJoinRoom,
  resetSession,
  setPlayers,
  setGame,
  setWords,
  setState,
  setCurrentTeam,
  setRoomConnected,
  setHints,
}) => {
  const classes = useStyles();
  useEffect(() => {
    resetConfig();
    resetGame();
    resetJoinRoom();
    resetSession();
  }, []);

  useEffect(() => {
    if (roomConnected) {
      const roomRef = database.ref(`/rooms/${roomId}`);
      roomRef.on("value", (roomRefSnapshot) => {
        const roomRefSnapshotVal = roomRefSnapshot.val();
        setPlayers(roomRefSnapshotVal.players);
        setGame({
          words: roomRefSnapshotVal.words,
          state: roomRefSnapshotVal.state,
          currentTeam: roomRefSnapshotVal.currentTeam,
          hints: roomRefSnapshotVal.hints,
        });
      });

      return () => roomRef.off();
    }
    setPlayers({});
  }, [roomConnected]);

  return (
    <Container>
      <Row style={{ marginTop: "5%", marginBottom: "3%" }}>
        <Col
          xs={{ size: 12, offset: 2, order: 1 }}
          md={{ size: 4, order: 1, offset: 2 }}
        >
          <h1
            style={{
              fontWeight: "normal",
              fontSize: "3em",
              fontFamily: "Courier",
            }}
          >
            <CodenamesIcon />
            CODENAMES
          </h1>
        </Col>
        {state != GAME_STATES.NEW && (
          <Col
            xs={{ size: 12, offset: 2, order: 1 }}
            md={{ size: 2, order: 1, offset: 3 }}
          >
            <LeaveGame />
          </Col>
        )}
      </Row>
      {roomConnected && state == GAME_STATES.NEW && <Players />}
      {!(state == GAME_STATES.STARTED || state == GAME_STATES.FINISHED) && (
        <JoinRoom />
      )}
      {roomConnected && state != GAME_STATES.NEW && <Game />}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    roomId: state.config.roomId,
    roomConnected: state.session.roomConnected,
    state: state.game.state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setPlayers: (players) => dispatch(setPlayersAction(players)),
  setWords: (words) => dispatch(setWordsAction(words)),
  setCurrentTeam: (team) => dispatch(setCurrentTeamAction(team)),
  resetConfig: () => dispatch(resetConfigAction()),
  resetGame: () => dispatch(resetGameAction()),
  resetJoinRoom: () => dispatch(resetJoinRoomAction()),
  resetSession: () => dispatch(resetSessionAction()),
  setGame: ({ words, state, currentTeam, hints }) =>
    dispatch(setGameAction({ words, state, currentTeam, hints })),
  setState: (state) => dispatch(setStateAction(state)),
  setRoomConnected: (bool) => dispatch(setRoomConnectedAction(bool)),
  setHints: (hints) => dispatch(setHintsAction(hints)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
