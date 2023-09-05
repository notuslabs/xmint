import { ethers, Contract } from 'ethers';
import type { EIP1193Provider } from '@web3-onboard/core';
import type { Account } from '@web3-onboard/core/dist/types';

import OilMintABI from '$lib/OilMint.json';
import XusdtABI from '$lib/XUSDT.json';
import { OilMintContract, XUSDTContract, rpcURL } from '$lib/constants';
import { txNotification, transactionErrors, type TransactionOptions } from '$lib/transaction';

/**
 * Approves the spending of xusdt.
 * @param provider A provider compatible with EIP1193.
 * @param options An optional object that allows to change the toast notification texts and to add callback functions.
 * @example ```ts
    {
		message: { 
			success: 'Success',
		    pending: 'Pending',
			error: 'Error'
	    },
		callbacks: {
			onSuccess: () => console.log('Success'),
			onFail: () => console.log('Error')
	    }
	}
 * ```
 */

export const approve = async (provider: EIP1193Provider, options?: TransactionOptions) => {
	const sendProvider = new ethers.providers.Web3Provider(provider);
	const signer = sendProvider.getSigner();

	try {
		const contractSend = new Contract(XUSDTContract, XusdtABI, signer);

		const tx = await contractSend.approve(OilMintContract, ethers.constants.MaxUint256);
		await txNotification(tx, options);
	} catch (error) {
		await transactionErrors(error, options?.callbacks?.onFail);
		console.log(error);
	}
};

export const allowance = async (connectedAccount: Account, amount: number) => {
	if (!connectedAccount) {
		return;
	}

	const readProvider = new ethers.providers.JsonRpcProvider(rpcURL);

	const contractRead = new Contract(XUSDTContract, XusdtABI, readProvider);

	try {
		const tx = await contractRead.allowance(connectedAccount.address, OilMintContract);
		const isApproved = Number(tx) / 10 ** 6 >= (amount / 0.0125) * 2;

		return isApproved;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const deposit = async (
	provider: EIP1193Provider,
	amount: number,
	options?: TransactionOptions
) => {
	const sendProvider = new ethers.providers.Web3Provider(provider);

	const signer = sendProvider.getSigner();

	try {
		const contractSend = new Contract(OilMintContract, OilMintABI, signer);
		const tx = await contractSend.deposit((amount / 0.0125) * 2 * 10 ** 6);
		await txNotification(tx, options);

		return tx;
	} catch (error) {
		await transactionErrors(error, options?.callbacks?.onFail);
		console.log(error);
	}
};

export const withdraw = async (
	provider: EIP1193Provider,
	amount: number,
	options?: TransactionOptions
) => {
	const sendProvider = new ethers.providers.Web3Provider(provider);

	const signer = sendProvider.getSigner();

	try {
		const contractSend = new Contract(OilMintContract, OilMintABI, signer);
		const tx = await contractSend.withdraw(((amount * 0.0125) / 2) * 10 ** 6);
		await txNotification(tx, options);

		return tx;
	} catch (error) {
		await transactionErrors(error, options?.callbacks?.onFail);
		console.log(error);
	}
};

export const balanceOf = async (connectedAccount: Account) => {
	const balance = {
		xusdt: 0,
		oilmint: 0
	};

	if (!connectedAccount) {
		return balance;
	}

	const readProvider = new ethers.providers.JsonRpcProvider(rpcURL);

	const xUSDT = new Contract(XUSDTContract, XusdtABI, readProvider);
	const xOil = new Contract(OilMintContract, OilMintABI, readProvider);

	try {
		if (connectedAccount.address) {
			const balanceXUSDT = await xUSDT.balanceOf(connectedAccount.address);
			const balanceOILMINT = await xOil.balanceOf(connectedAccount.address);

			balance.xusdt = Number(balanceXUSDT) / 10 ** 6;
			balance.oilmint = Number(balanceOILMINT) / 10 ** 6;
		}
	} catch (error) {
		console.log(error);
	}

	return balance;
};
