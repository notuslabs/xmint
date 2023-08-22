import { createTabs } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

type InitTabProps = Parameters<typeof createTabs>[0];

export function initTabsStore(props: InitTabProps) {
	const tabsStore = createTabs(props);

	setContext('tabs', tabsStore);
}

export function getTabsStore() {
	return getContext<ReturnType<typeof createTabs>>('tabs');
}
