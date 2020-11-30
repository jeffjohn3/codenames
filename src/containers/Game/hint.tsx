import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import { nextTeam } from "@/services/game";
import Textbox from "@/components/Textbox";
import ButtonWithLoading from "@/components/ButtonWithLoading";

const Hint = ({ currentTeam }) => {
  const [hintValue, setHintValue] = useState("");

  const onClick = async () => {
    nextTeam(currentTeam);
  };

  return (
    <Row style={{ alignItems: "center" }}>
      <Col
        xs={{ size: 10, offset: 1 }}
        md={{ size: 4, offset: 3 }}
        style={{ textAlign: "center" }}
      >
        <Textbox
          value={hintValue}
          placeholder="Enter a hint"
          onChange={setHintValue}
          onSubmit={() => {}}
        />
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
});

export default connect(mapStateToProps)(Hint);
