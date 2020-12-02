import React from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";

import Word from "@/components/Word";
import Hint from "@/containers/Game/hint";
import WaitingMessage from "@/containers/Game/waitingMessage";

export const Game = ({ words, userTeam, currentTeam }) => {
  return (
    <React.Fragment>
      <Row style={{ marginBottom: "3%" }}>
        <Col
          xs={{ size: 12 }}
          md={{ size: 12 }}
          style={{ textAlign: "center" }}
        >
          {words &&
            words.map((word, index) => {
              return <Word word={word} index={index} key={word.word} />;
            })}
        </Col>
      </Row>
      {currentTeam == userTeam ? <Hint /> : <WaitingMessage />}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  words: state.game.words,
  userTeam: state.joinRoom.userTeam,
  currentTeam: state.game.currentTeam,
});

export default connect(mapStateToProps)(Game);
