import { createTabs } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

export function initTabsStore(defaultValue: 'mint' | 'redeem') {
	const tabsStore = createTabs({
		defaultValue
	});

	setContext('tabs', tabsStore);
}

export function getTabsStore() {
	return getContext<ReturnType<typeof createTabs>>('tabs');
}
