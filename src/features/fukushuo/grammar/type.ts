export interface Example {
	japanese: string;
	vietnamese: string;
}

export interface BunbouRecord {
	id: number;
	lvl: string;
	structure: string;
	meaning: string;
	explanation: string;
	examples: string; // Chuỗi JSON từ database
	note: string;
}