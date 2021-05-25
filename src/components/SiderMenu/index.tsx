import React from 'react';
import { Menu } from "antd";
import { Link } from "react-router-dom";

const MenuItem = Menu.Item;

export const SiderMenu = (props: any) => {
  return (
    <Menu defaultSelectedKeys={['stake']} style={{height: "100%"}}>
      <MenuItem key="stake"><Link to={"/stake"}>Stake</Link></MenuItem>
      <MenuItem key="farm"><Link to={"/farm"}>NFT Farm's</Link></MenuItem>
      <MenuItem key="harvest"><Link to={"/harvest"}>NFT Harvest</Link></MenuItem>
      <MenuItem key="market"><Link to={"/market"}>Market</Link></MenuItem>
    </Menu>
  );
}