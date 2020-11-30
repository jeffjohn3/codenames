import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

const roleMapping = {
  blueSpymaster: "Blue Spymaster",
  redSpymaster: "Red Spymaster",
  blueOperatives: "Blue Operatives",
  redOperatives: "Red Operatives ",
};

const WaitingMessage = ({ currentTeam }) => {
  return (
    <Row style={{ alignItems: "center", marginTop: "3%" }}>
      <Col
        xs={{ size: 6, offset: 3 }}
        md={{ size: 4, offset: 4 }}
        style={{ textAlign: "center" }}
      >
        Waiting for...
        <p style={{ display: "block" }}> {roleMapping[currentTeam]}</p>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  currentTeam: state.game.currentTeam,
});

export default connect(mapStateToProps)(WaitingMessage);
