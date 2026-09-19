export type Option = {
	key: any;
	value: string;
};

export type PageDropdownProps = {
	options?: Option[];
	value?: string;
	onChange?: (page: Option) => void;
};