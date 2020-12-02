import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { GoClippy } from "react-icons/go";
import { css } from "emotion";
import _ from "lodash";

import { setRoomConnectedAction } from "@/redux/actions/session";
import {
  setJoinRoomIdAction,
  setUserIdAction,
  setUserTeamAction,
} from "@/redux/actions/joinRoom";
import {
  setPlayersAction,
  setRoomIdAction,
  setOwnerIdAction,
} from "@/redux/actions/config";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import Textbox from "@/components/Textbox";
import {
  leftColXs,
  leftColMd,
  rightColXs,
  rightColMd,
  centerColXs,
  centerColMd,
} from "@/containers/App/dependencies/consts";
import copyToClipboard from "@/utils/copyToClipboard";
import generateRoomId from "@/services/roomIdGenerator";
import {
  createGame,
  deleteGame,
  resetGame,
  setGameState,
} from "@/services/game";
import { database } from "@/services/firebase";
import { GAME_STATES } from "@/consts/game";

export const Room = ({
  players,
  setPlayers,
  roomId,
  roomConnected,
  setRoomConnected,
  setRoomId,
  ownerId,
  setOwnerId,
  userId,
  setUserId,
  joinRoomId,
  setJoinRoomId,
  setUserTeam,
}) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);

  // Displays RoomId text field.
  const [joining, setJoining] = useState(false);

  const onCreateRoom = async () => {
    setUserTeam("blueSpymaster");
    setPlayers({
      ...players,
      blueSpymaster: userId,
    });
    setOwnerId(userId);
    setCreateLoading(true);

    try {
      await createGame(true);
      setRoomConnected(true);
    } catch (err) {
      // showError(null, err);
      // props.refreshRoomId();
    }

    setCreateLoading(false);
  };

  const onRefreshRoom = async () => {
    // await deleteGame();
    setRoomId(generateRoomId());
    // await onCreateRoom();
  };

  const onCloseRoom = async () => {
    // logEvent("ROOM_CLOSE");
    await deleteGame();
    setRoomConnected(false);
  };

  const onJoinRoom = async () => {
    setJoining(true);
  };

  const onJoin = async () => {
    if (userId && joinRoomId) {
      const roomOnline = await database
        .ref(`rooms/${joinRoomId}`)
        .once("value");
      if (roomOnline.exists()) {
        const playersSnapshot = roomOnline.val().players;
        await database.ref(`rooms/${joinRoomId}/players`).update({
          ...playersSnapshot,
          blueOperatives: _.concat(
            playersSnapshot.blueOperatives || [],
            userId,
          ),
        });
        setRoomId(joinRoomId);
        setUserTeam("blueOperatives");
        setRoomConnected(true);
      } else {
        setJoining(false);
        alert("Room does not exist.");
      }
    } else {
      alert("Username and Room Id are required");
    }
  };

  const onStartGame = async () => {
    setGameState(GAME_STATES.STARTED);
  };

  if (roomConnected) {
    return (
      <React.Fragment>
        <Row className={styles.roomControllerContainer}>
          <Col xs={leftColXs} md={leftColMd}>
            <ButtonWithLoading
              outline
              color="secondary"
              loading={createLoading}
              block
              className={styles.roomId}
              onClick={() => copyToClipboard(roomId)}
            >
              Room
              {": "}
              <span>{roomId}</span>
              {"   "}
              <GoClippy className={styles.copy} />
            </ButtonWithLoading>
          </Col>
          {userId == ownerId && (
            <Col xs={rightColXs} sm={rightColMd} className={styles.roomHelp}>
              Ask your players to join this room. They can choose a name when
              joining the room.
              <div className={styles.refresh} onClick={onRefreshRoom}>
                ↻
              </div>
              <div className={styles.close} onClick={onCloseRoom}>
                ✘
              </div>
            </Col>
          )}
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col xs={centerColXs} md={{ size: 4, offset: 4 }}>
            <ButtonWithLoading
              color="primary"
              loading={createLoading}
              block
              className={styles.roomId}
              onClick={onStartGame}
            >
              Start Game
            </ButtonWithLoading>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  return (
    <Row className={styles.roomControllerContainer}>
      <Col xs={centerColXs} md={centerColMd}>
        <Textbox
          value={userId}
          placeholder="Username"
          onChange={setUserId}
          onSubmit={joining ? onJoin : onCreateRoom}
        />
      </Col>
      <Col xs={leftColXs} md={leftColMd}>
        {joining ? (
          <Textbox
            value={joinRoomId}
            placeholder="Room Id"
            onChange={setJoinRoomId}
            onSubmit={onJoin}
          />
        ) : (
          <ButtonWithLoading
            color="primary"
            block
            loading={createLoading}
            onClick={onCreateRoom}
          >
            Create Room
          </ButtonWithLoading>
        )}
      </Col>
      <Col xs={rightColXs} md={rightColMd}>
        {/* <Link to="/join"> */}
        {joining ? (
          <ButtonWithLoading
            color="primary"
            block
            loading={joinLoading}
            onClick={onJoin}
          >
            Join!
          </ButtonWithLoading>
        ) : (
          <ButtonWithLoading
            color="primary"
            block
            loading={joinLoading}
            onClick={onJoinRoom}
          >
            Join Room
          </ButtonWithLoading>
        )}
        {/* </Link> */}
      </Col>
    </Row>
  );
};

const styles = {
  roomControllerContainer: css({
    marginTop: 40,
    alignItems: "center",
  }),
  roomId: css({
    letterSpacing: 2,
    fontWeight: 700,
    fontFamily: "Inconsolata, Consolas, monaco, monospace",
    textTransform: "uppercase",
    wordBreak: "break-all",
  }),
  roomHelp: css({
    fontSize: "0.7rem",
    // color: SHADES.light,
    textAlign: "center",
  }),
  copy: css({
    fontSize: "1rem",
    marginBottom: 5,
  }),
  refresh: css({
    display: "inline-block",
    marginLeft: 10,
    cursor: "pointer",
    "&:hover": {
      // color: SHADES.darker,
    },
  }),
  close: css({
    display: "inline-block",
    marginLeft: 10,
    cursor: "pointer",
    "&:hover": {
      // color: SHADES.darker,
      color: "red",
    },
  }),
};

const mapStateToProps = (state) => ({
  players: state.config.players,
  roomId: state.config.roomId,
  userId: state.joinRoom.userId,
  ownerId: state.config.ownerId,
  joinRoomId: state.joinRoom.roomId,
  roomConnected: state.session.roomConnected,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayers: (players) => dispatch(setPlayersAction(players)),
  setOwnerId: (ownerId) => dispatch(setOwnerIdAction(ownerId)),
  setUserId: (userId) => dispatch(setUserIdAction(userId)),
  setRoomConnected: (connected) => dispatch(setRoomConnectedAction(connected)),
  setRoomId: (roomId) => dispatch(setRoomIdAction(roomId)),
  setJoinRoomId: (roomId) => dispatch(setJoinRoomIdAction(roomId)),
  setUserTeam: (team) => dispatch(setUserTeamAction(team)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
