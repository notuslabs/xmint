import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "@nomiclabs/hardhat-ethers";


const config: HardhatUserConfig = {
  solidity:{version: "0.8.0",
            settings: {optimizer: {enabled: true, runs: 1000}}},
  networks: {
    xinfin: {
      url: "https://rpc1.xinfin.network	", 
      chainId: 50,
      accounts: [YourPrivateKey], 
    },
  },
};

export default config;