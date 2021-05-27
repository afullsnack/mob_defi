import React, { useEffect, useCallback, useState } from "react";
import { Col, Row, Card, Avatar, Tabs, Radio, InputNumber } from "antd";
// import { RocketOutlined } from "@ant-design/icons";
import { useQuery } from "../../hooks";

import { EditFilled } from "@ant-design/icons";

const { TabPane } = Tabs;

// type LockTimeOptions = {
//   label: String,
//   value: number,
//   disabled: Boolean,
// }

const _lockTimeOptions = [
  { label: "14", value: 14, disabled: false },
  { label: "30", value: 30, disabled: false },
  { label: "60", value: 60, disabled: false },
  { label: "90", value: 90, disabled: false },
]
const _tokenRewardOptions = [
  { label: "MOBX", value: "MOBX", disabled: false },
  { label: "USDT", value: "USDT", disabled: false },
  { label: "SOL", value: "SOL", disabled: false },
  { label: "RAY", value: "RAY", disabled: false },
]

export const SavingsView = () => {

  const [lockTime, setLockTime] = useState(14);
  const [tokenReward, setTokenReward] = useState("MOBX");

  const query = useQuery();
  const onTabChange = useCallback((key) => console.log("Tab Key: ", key), []);
  const _lockTimeOptionsChange = useCallback((e) => setLockTime(e.target.value), []);
  const _tokenRewardOptionsChange = useCallback((e) => setTokenReward(e.target.value), []);

  useEffect(() => {

    // handle component exit
    return () => {};
  });

    return (
      <Row gutter={16} align="stretch">
        <Col span={24}>
          <Tabs defaultActiveKey="individual" onChange={onTabChange}>
            <TabPane tab="Individual Savings" key="individual">
              <Row gutter={[16, 16]} align="top">
                <Col span={8}>
                  <Card title="Untitled Plan" extra={<EditFilled />} style={{textAlign: "left"}}>
                    <Card.Meta description="plan description is less that 120 chars" />
                    <br/>
                    <h4>Enter savings amount ($20 min equiv)</h4>
                    <InputNumber
                      size="middle"
                      defaultValue={1000.75}
                      maxLength={11}
                      decimalSeparator="."
                      precision={2}
                      onChange={value => console.log(value)}
                      formatter={value => `SOL ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      style={{width: "100%"}}
                    />
                    <br/><br/>
                    <h4>Select lock in period(days)</h4>
                    <Radio.Group
                      size="middle"
                      options={_lockTimeOptions}
                      onChange={_lockTimeOptionsChange}
                      value={lockTime}
                      optionType="button"
                      buttonStyle="solid"
                    />
                    <br/><br/>
                    <h4>Choose token to be rewarded in</h4>
                    <Radio.Group
                      size="middle"
                      options={_tokenRewardOptions}
                      onChange={_tokenRewardOptionsChange}
                      value={tokenReward}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Custom Savings" key="custom">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Public Savings" key="public">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    )
}