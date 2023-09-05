import { addToast, type ToastData } from '$lib/components/Toaster.svelte';

export type Message = {
	pending?: string;
	error?: string;
	success?: string;
};

export type Callbacks = {
	onSuccess?: () => Promise<void> | void;
	onFail?: () => Promise<void> | void;
};

export type TransactionOptions = {
	message?: Message;
	callbacks?: Callbacks;
};

function createSuccess(message: string) {
	const data: ToastData = {
		title: 'Success',
		description: message,
		color: 'bg-green-500'
	};

	addToast({
		data
	});
}

function createWarning(message: string) {
	const data: ToastData = {
		title: 'Warning',
		description: message,
		color: 'bg-orange-500'
	};

	addToast({
		data
	});
}

function createError(message: string) {
	const data: ToastData = {
		title: 'Error',
		description: message,
		color: 'bg-red-500'
	};

	addToast({
		data
	});
}

export async function txNotification(tx: any, options?: TransactionOptions) {
	// Send pending notifications
	createWarning(options?.message?.pending ?? 'Transaction pending');

	// Await for transaction receipt
	const receipt = await tx.wait();

	if (receipt?.blockNumber && receipt?.status === 1) {
		// If status code 1 then send success toast
		createSuccess(options?.message?.success ?? 'Transaction success');

		// call function on success
		if (options?.callbacks?.onSuccess) {
			await options?.callbacks.onSuccess();
		}

		return receipt;
	} else {
		// If status code 1 or null send transaction failed modal
		createError(options?.message?.error ?? 'Transaction failed');

		// call function on fail
		if (options?.callbacks?.onFail) {
			await options?.callbacks.onFail();
		}

		return receipt;
	}
}

export async function transactionErrors(error: any, onFail?: () => Promise<void> | void) {
	if (onFail) {
		await onFail();
	}

	if (error.code === 4001) {
		createError(error.message);
		return;
	}

	createError(error.message);

	return;
}
