import React, { useEffect } from "react";
import { Col, Row, Button, Card } from "antd";


export const MarketView = () => {


    return (
        <Row gutter={[16, 16]} align={"middle"}>
            <Col span={12}>
                <Card title="Market">
                    <Card.Meta title={"Deposit Naira"} description={"Deposit naira and get sol to stake and start getting rewarded"} />
                </Card>
            </Col>
          <Col span={12}>
            <Card>
              <Card.Meta title={"Deposit Naira"} description={"Deposit naira and get sol to stake and start getting rewarded"} />
            </Card>
          </Col>
        </Row>
    )
}