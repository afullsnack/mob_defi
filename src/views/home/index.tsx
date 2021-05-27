import { Col, Row, Card, Avatar } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "../../components/ConnectButton";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";

import { RocketOutlined } from "@ant-design/icons";

import "./style.less";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt';
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  useEffect(() => {
    const refreshTotal = () => {};

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  return (
    // <Row gutter={[16, 16]} align="middle">
    //   <Col span={24}>
    //     <h2>Your balances ({formatUSD.format(totalBalanceInUSD)}):</h2>
    //     <h2>SOL: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD)})</h2>
    //     <h2 style={{ display: 'inline-flex', alignItems: 'center' }}>
    //       <TokenIcon mintAddress={SRM_ADDRESS} /> SRM: {SRM?.balance} ({formatUSD.format(SRM?.balanceInUSD)})
    //     </h2>
    //   </Col>

    //   <Col span={12}>
    //     <ConnectButton />
    //   </Col>
    //   <Col span={12}>
    //     <Link to="/faucet">
    //       <Button>Faucet</Button>
    //     </Link>
    //   </Col>
    //   <Col span={24}>
    //     <div className="builton" />
    //   </Col>
    // </Row>

    <Row gutter={[16, 16]} style={{margin: 0, padding: 0}} align="middle">
          <Col span={24}>
              <h1 style={{fontSize: 21}}>To get started</h1>
              <span>choose your savings style</span>
          </Col>
          <Col span={8}>
            <Link to="/savings?type=individual">
              <Card hoverable title="Individual Savings" extra={<Avatar shape="circle" size="large" children={<RocketOutlined size={21} />} />} style={{textAlign: "left"}}>
                <Card.Meta description={"Deposit your naira to start your savings journey and get high APY returns on your locked in savings"} />
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/savings?type=custom">
              <Card hoverable title="Custom Savings Pool" extra={<Avatar shape="circle" size="large" children={<RocketOutlined size={21} />} />} style={{textAlign: "left"}}>
                <Card.Meta description={"Create a custom group and add your friends and family to save, with a max amount set"} />
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/savings?type=public">
              <Card hoverable title="Public Savings Pool" extra={<Avatar shape="circle" size="large" children={<RocketOutlined size={21} />} />} style={{textAlign: "left"}}>
                <Card.Meta description={"Join public savings pool with any amount if you can't afford the minimum for and individual savings"} />
              </Card>
            </Link>
          </Col>
        </Row>
  );
};
