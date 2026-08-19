import { getEntry } from 'astro:content';

// Small typed helpers so pages don't repeat `(await getEntry('config', 'x')).data` everywhere.
// Each config/*.json file is a singleton entry keyed by filename. The `config`
// collection schema is intentionally loose (z.record) since business.json,
// design-packages.json, etc. have very different shapes — this local type is
// what actually constrains business.json's fields for Header/Footer/Layout.
export interface Business {
	name: string;
	foundedYear: number;
	phone: string;
	phoneHref: string;
	emailGeneral: string;
	hours: string;
	serviceArea: string;
	nav: { label: string; href: string }[];
	footerNav: { label: string; href: string }[];
}

export async function getBusiness(): Promise<Business> {
	const entry = await getEntry('config', 'business');
	if (!entry) throw new Error('Missing content/config/business.json');
	return entry.data as unknown as Business;
}

export async function getDesignPackages() {
	const entry = await getEntry('config', 'design-packages');
	if (!entry) throw new Error('Missing content/config/design-packages.json');
	return entry.data;
}

export async function getSupplyProcess() {
	const entry = await getEntry('config', 'supply-process');
	if (!entry) throw new Error('Missing content/config/supply-process.json');
	return entry.data;
}

export async function getDesignProcess() {
	const entry = await getEntry('config', 'design-process');
	if (!entry) throw new Error('Missing content/config/design-process.json');
	return entry.data;
}

export async function getKitInclusions() {
	const entry = await getEntry('config', 'kit-inclusions');
	if (!entry) throw new Error('Missing content/config/kit-inclusions.json');
	return entry.data;
}

export async function getSupplyOptions() {
	const entry = await getEntry('config', 'supply-options');
	if (!entry) throw new Error('Missing content/config/supply-options.json');
	return entry.data;
}
