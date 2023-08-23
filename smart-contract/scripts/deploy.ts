import { ethers } from "hardhat";

async function main() {
  const DepositVault = await ethers.getContractFactory("OilxMint");
  const depositMultiplier = 625; 
  const depositVault = await DepositVault.deploy('0xd4b5f10d61916bd6e0860144a91ac658de8a1437',depositMultiplier);

  console.log("DepositVault deployed to:", depositVault.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
