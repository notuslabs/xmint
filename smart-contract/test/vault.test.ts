// Importando as bibliotecas do Hardhat e o ethers
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { expect } from "chai";
import { ERC20 } from "../typechain-types";

describe("DepositVault", function () {
  let DepositVault: ContractFactory;
  let depositVault: any
  let owner: Signer;
  let user: Signer;
  let erc20Token: ERC20

  // Inicialização dos testes
  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Criação do token ERC20 fictício
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    erc20Token = await ERC20Mock.deploy("Fake Token", "FAKE", ethers.parseUnits("1000000", 18));

    // Deploy do contrato DepositVault
    DepositVault = await ethers.getContractFactory("OilxMint");
    depositVault = await DepositVault.deploy(await erc20Token.getAddress(), 625);

  });

  // Teste de depósito e devolução
  it("should deposit tokens and withdraw them correctly", async function () {
    const initialBalance = await depositVault.balanceOf(await owner.getAddress());
    console.log('1')

    // Fazer um depósito de tokens
    const depositAmount = ethers.parseUnits("100", 18); // Exemplo: 100 tokens com 18 casas decimais
    await erc20Token.approve(await depositVault.getAddress(), depositAmount)
    await depositVault.deposit(depositAmount);
    console.log('2')

    // Verificar que os tokens foram mintados corretamente

    const finalBalance = await depositVault.balanceOf(await owner.getAddress());
    const recebido =  depositAmount * 625n / 100000n

    expect(finalBalance - initialBalance).to.equal(recebido);

    // Fazer a devolução dos tokens e verificar o saldo
    await depositVault.withdraw(recebido);
    const finalFinalBalance = await depositVault.balanceOf(await owner.getAddress());
    console.log(finalFinalBalance)

    expect(finalFinalBalance).to.equal(initialBalance);
  });
});