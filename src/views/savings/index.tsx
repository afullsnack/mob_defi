import React, { useEffect, useCallback, useState } from "react";
import { Col, Row, Card, Tabs, Radio, Input, Button, Popover, message, List, Avatar } from "antd";

import { useQuery } from "../../hooks";

import { EditFilled, SaveFilled } from "@ant-design/icons";
import { initStake, delegateStake, getDelegeationStatus } from "../../actions/stake";
import { useConnection } from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";
import { useLocalStorageState } from "../../utils/utils";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const { TabPane } = Tabs;



const _lockTimeOptions = [
  { label: "14", value: 14, disabled: false },
  { label: "30", value: 30, disabled: false },
  { label: "60", value: 60, disabled: false },
  { label: "90", value: 90, disabled: false },
]

let list: any = [];


export const SavingsView = () => {

  const connection = useConnection();
  const { wallet, publicKey } = useWallet();
  const [keys, setKeys] = useLocalStorageState('stakePubkeys');
  const [lockedValue, setLockedValue] = useLocalStorageState('lockedValue');

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("New Savings");
  const [desc, setDesc] = useState("Enter description");
  const [amount, setAmount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [lockTime, setLockTime] = useState(14);
  const [tokenReward, setTokenReward] = useState("SOL");


  const query = useQuery();
  const onTabChange = useCallback((key) => console.log("Tab Key: ", key), []);
  const _changeEditMode = useCallback(() => setEditMode(state => !state), []);
  const _onTitleChange = useCallback((e) => setTitle(e.target.value), []);
  const _onDescChange = useCallback((e) => setDesc(e.target.value), []);
  const _onAmountChange = useCallback((e) => setAmount(e.target.value), []);
  const _lockTimeOptionsChange = useCallback((e) => setLockTime(e.target.value), []);
  const _save = useCallback(async () => {
    if(!wallet?.publicKey) throw new Error("Wallet is not connected for stake");

    console.log(amount);
    console.log(title, desc, lockTime);
    console.log(Number(amount) * LAMPORTS_PER_SOL);

    if(Number(amount) === 0 || amount === null) return message.error("Fill in the required options");
    let walletBallance = await connection.getAccountInfo(wallet.publicKey);
    if(walletBallance != undefined && walletBallance.lamports < (Number(amount) * LAMPORTS_PER_SOL)) return message.error("Your wallet ballance is insufficient");

    setLoading(true);

    let date = new Date();
    // initialize the save options
    let lockDate = date.setDate(date.getDate() + lockTime);
    console.log(lockDate);

    const res = await initStake(
      connection,
      wallet,
      { amount, lockDate }
    );

    console.log(keys);
    keys === undefined? setKeys([res?.stakePubkey]) : setKeys([...keys, res?.stakePubkey]);
    lockedValue === null? setLockedValue(res?.fund) : setLockedValue(lockedValue+res?.fund);



    await delegateStake(connection, wallet);

    let status = await getDelegeationStatus(connection, wallet);

    if(status == "activating") {
      setLoading(false)
      message.success("Stake account created, Pending activation");
    }

    setLoading(false);
  }, [amount, title, desc, lockTime, loading]);
  // const _tokenRewardOptionsChange = useCallback((e) => setTokenReward(e.target.value), []);

  
  useEffect(() => {

    keys.map((key: string) => list.push(key));
    console.log(list);

    // handle component exit
    return () => {};
  });

    return (
      <Row gutter={16} align="stretch">
        <Col span={24}>
          <Tabs defaultActiveKey={query.get("type")?.toString()} onChange={onTabChange}>
            <TabPane tab="Individual Savings" key="individual">
              <Row gutter={[16, 16]} align="top">
                <Col sm={{span: 24}} md={{span: 12}} lg={{span: 8}}>
                  <Card title={editMode? <Input type="text" style={{width: "60%"}} onChange={_onTitleChange} value={title} /> : title} extra={editMode? <SaveFilled onClick={_changeEditMode} /> : <EditFilled onClick={_changeEditMode} />} style={{textAlign: "left"}} actions={[<Button type="primary" size="large" block onClick={() => _save()} loading={loading}>Save</Button>]}>
                    <Popover content="Description upto 120 chars">
                      <Card.Meta description={editMode? <Input type="text" onChange={_onDescChange} value={desc} placeholder="120 Chars" /> : desc} />
                    </Popover>
                    <br/>
                    <h4>Enter an amount to stake</h4>
                    <Input
                      type="number"
                      size="middle"
                      // value={amount}
                      prefix="SOL"
                      // maxLength={11}
                      // decimalSeparator="."
                      // precision={2}
                      onChange={_onAmountChange}
                      // formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                    <Popover content={<span>Option to choose token reward coming soon.<br/>NOTE: commission fee: 5%</span>}>
                      <h4>You will be rewarded in stSOL</h4>
                    </Popover>
                    {/* <Radio.Group
                      size="middle"
                      options={_tokenRewardOptions}
                      onChange={_tokenRewardOptionsChange}
                      value={tokenReward}
                      optionType="button"
                      buttonStyle="solid"
                    /> */}
                  </Card>
                </Col>
                {/* {
                  keys.map((key: any) => {
                    <Col sm={{span: 24}} md={{span: 12}} lg={{span: 8}}>
                      <Card title={editMode? <Input type="text" style={{width: "60%"}} onChange={_onTitleChange} value={title} /> : title} extra={editMode? <SaveFilled onClick={_changeEditMode} /> : <EditFilled onClick={_changeEditMode} />} style={{textAlign: "left"}} actions={[<Button type="primary" size="large" block onClick={() => _save()} loading={loading}>Save</Button>]}>
                        <Popover content="Description upto 120 chars">
                          <Card.Meta description={editMode? <Input type="text" onChange={_onDescChange} value={desc} placeholder="120 Chars" /> : desc} />
                        </Popover>
                        <br/>
                        <Input
                          type="number"
                          size="middle"
                          // value={amount}
                          prefix="SOL"
                          // maxLength={11}
                          // decimalSeparator="."
                          // precision={2}
                          onChange={_onAmountChange}
                          // formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                        <Popover content={<span>Option to choose token reward coming soon.<br/>NOTE: commission fee: 5%</span>}>
                          <h4>You will be rewarded in SOL</h4>
                        </Popover>
                      </Card>
                    </Col>
                  })
                } */}
              </Row>
            </TabPane>
            <TabPane tab="Custom Savings" key="custom">
              <Row gutter={16} style={{width: "100%"}}>
                <Col span={24}>
                  <h1>Coming Soon</h1>
                  <h4>Creating custom savings pool, set max amount and minimum amount and auto lock in when amount is reached</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Current Savings" key="current">
              <Row gutter={16} style={{width: "100%"}}>
                <Col span={6}>
                </Col>
                <Col span={12}>
                  <List
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={async (item: string) => (
                      <List.Item key={item}>
                        <List.Item.Meta
                          // avatar={<Avatar children={item} />}
                          title={(await connection.getStakeActivation(new PublicKey(item))).state}
                          description={<a href={`https://explorer.solana.com/address/${item}?cluster=devnet`}>{item}</a>}
                        />
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={6}>
                </Col>

              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    )
}