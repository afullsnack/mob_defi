import React, { useEffect } from "react";
import { Col, Row, Button, Card, Avatar } from "antd";
import { RocketOutlined } from "@ant-design/icons";

import "./style.less";


export const SavingsView = () => {


    return (
        <Row gutter={[16, 16]} style={{margin: 0, padding: 0}} align="middle">
          <Col span={24}>
              <h1 style={{fontSize: 21}}>To get started</h1>
              <span>choose your savings style</span>
          </Col>
          <Col span={8}>
            <Card hoverable title="Individual Savings" extra={<Avatar shape="circle" size="large" children={<RocketOutlined size={21} />} />} style={{textAlign: "left"}}>
              <Card.Meta description={"Deposit your naira to start your savings journey and get high APY returns on your locked in savings"} />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable title="Custom Savings Pool" extra={<Avatar shape="circle" size="large" children={<RocketOutlined size={21} />} />} style={{textAlign: "left"}}>
              <Card.Meta description={"Create a custom group and add your friends and family to save, with a max amount set"} />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable title="Public Savings Pool" extra={<Avatar shape="circle" size="large" children={<RocketOutlined size={21} />} />} style={{textAlign: "left"}}>
              <Card.Meta description={"Join public savings pool with any amount if you can't afford the minimum for and individual savings"} />
            </Card>
          </Col>
        </Row>
    )
}