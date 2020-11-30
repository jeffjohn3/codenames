import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import { nextTeam } from "@/services/game";
import ButtonWithLoading from "@/components/ButtonWithLoading";

const EndTurn = ({ currentTeam }) => {
  const onClick = async () => {
    nextTeam(currentTeam);
  };

  return (
    <Row style={{ alignItems: "center" }}>
      <Col xs={{ size: 6, offset: 3 }} md={{ size: 4, offset: 4 }}>
        <ButtonWithLoading color="primary" onClick={onClick} block>
          End Turn
        </ButtonWithLoading>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  currentTeam: state.game.currentTeam,
});

export default connect(mapStateToProps)(EndTurn);
