import React, { useEffect } from "react";
import { Col, Row, Button, Card } from "antd";


export const FarmView = () => {

    return (
      <Row gutter={[16, 16]} align={"middle"}>
        <Col span={24}>
          <Card title="NFT Farming">
            <Card.Meta title="Coming Soon" description="This feature is being built to make sure everything works as expected for our users, for more details see our road map" />
          </Card>
        </Col>
      </Row>
    )
}