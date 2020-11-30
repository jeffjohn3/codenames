import React from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";

import { setPlayersAction } from "@/redux/actions/config";
import { setUserTeamAction } from "@/redux/actions/joinRoom";
import { database } from "@/services/firebase";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import Player from "@/components/Textbox";
import {
  leftColXs,
  leftColMd,
  rightColXs,
  rightColMd,
} from "@/containers/App/dependencies/consts";

export const Players = ({ players, userId, userTeam, roomId, setUserTeam }) => {
  const h2Style = {
    fontSize: "1.5em",
    textAlign: "left" as const,
    fontFamily: "Courier",
  };

  const isSpymaster = (team) => {
    return team == "redSpymaster" || team == "blueSpymaster";
  };

  const joinTeam = (newTeam) => {
    return async () => {
      const newPlayers = {
        ...players,
        [userTeam]: isSpymaster(userTeam)
          ? ""
          : _.remove(players[userTeam], (player) => player != userId),
        [newTeam]: isSpymaster(newTeam)
          ? userId
          : _.concat(players[newTeam] || [], userId),
      };
      setUserTeam(newTeam);
      await database.ref(`rooms/${roomId}/players`).update(newPlayers);
    };
  };

  return (
    <React.Fragment>
      {players && (
        <React.Fragment>
          <Row style={{ marginTop: "3%" }}>
            <Col xs={leftColXs} md={leftColMd} className="text-center">
              <h2 style={h2Style}> Spymaster </h2>
              {players.blueSpymaster ? (
                <Player
                  placeholder={players.blueSpymaster}
                  value={players.blueSpymaster}
                  disabled={true}
                  deletable={true}
                />
              ) : (
                <ButtonWithLoading
                  color="primary"
                  block
                  loading={false}
                  onClick={joinTeam("blueSpymaster")}
                >
                  Join
                </ButtonWithLoading>
              )}
            </Col>
            <Col xs={rightColXs} md={rightColMd} className="text-center">
              <h2 style={h2Style}> Spymaster </h2>
              {players.redSpymaster ? (
                <Player
                  placeholder={players.redSpymaster}
                  value={players.redSpymaster}
                  disabled={true}
                  deletable={true}
                />
              ) : (
                <ButtonWithLoading
                  color="primary"
                  block
                  loading={false}
                  onClick={joinTeam("redSpymaster")}
                >
                  Join
                </ButtonWithLoading>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Col xs={leftColXs} md={leftColMd} className="text-center">
              <h2 style={h2Style}> Operatives </h2>
              {players.blueOperatives &&
                players.blueOperatives.map((operative) => (
                  <Player
                    key={operative}
                    placeholder={operative}
                    value={operative}
                    disabled={true}
                    deletable={true}
                  />
                ))}
              {userTeam != "blueOperatives" && (
                <ButtonWithLoading
                  color="primary"
                  block
                  loading={false}
                  onClick={joinTeam("blueOperatives")}
                >
                  Join
                </ButtonWithLoading>
              )}
            </Col>
            <Col xs={rightColXs} md={rightColMd} className="text-center">
              <h2 style={h2Style}> Operatives </h2>
              {players.redOperatives &&
                players.redOperatives.map((operative) => (
                  <Player
                    key={operative}
                    placeholder={operative}
                    value={operative}
                    disabled={true}
                    deletable={true}
                  />
                ))}
              {userTeam != "redOperatives" && (
                <ButtonWithLoading
                  color="primary"
                  block
                  loading={false}
                  onClick={joinTeam("redOperatives")}
                >
                  Join
                </ButtonWithLoading>
              )}
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  roomId: state.config.roomId,
  players: state.config.players,
  userId: state.joinRoom.userId,
  userTeam: state.joinRoom.userTeam,
});
const mapDispatchToProps = (dispatch) => ({
  setUserTeam: (team) => dispatch(setUserTeamAction(team)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Players);
