import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import _ from "lodash";

import ButtonWithLoading from "@/components/ButtonWithLoading";
import { database } from "@/services/firebase";
import { setRoomConnectedAction } from "@/redux/actions/session";
import { setGameState } from "@/services/game";
import { GAME_STATES } from "@/consts/game";

const isSpymaster = (team) => {
  return team == "redSpymaster" || team == "blueSpymaster";
};

const LeaveGame = ({
  currentTeam,
  roomId,
  userId,
  players,
  setRoomConnected,
}) => {
  const onClick = async () => {
    const newPlayers = {
      ...players,
      [currentTeam]: isSpymaster(currentTeam)
        ? ""
        : _.remove(players[currentTeam], (player) => player != userId),
    };
    await database.ref(`rooms/${roomId}/players`).update(newPlayers);
    setRoomConnected(false);
    setGameState(GAME_STATES.NEW);
  };

  return (
    <ButtonWithLoading
      color="danger"
      onClick={onClick}
      block
      style={{ marginTop: "7%" }}
    >
      Leave Game
    </ButtonWithLoading>
  );
};

const mapStateToProps = (state) => ({
  currentTeam: state.game.currentTeam,
  roomId: state.config.roomId,
  players: state.config.players,
  userId: state.joinRoom.userId,
});

const mapDispatchToProps = (dispatch) => ({
  setRoomConnected: (bool) => dispatch(setRoomConnectedAction(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaveGame);
