import React, { useRef, useState } from "react";
import {
	Modal,
	Pressable,
	Text,
	View,
} from "react-native";
import { Check, ChevronDown } from "lucide-react-native";

type Page = {
	id: string;
	title: string;
};

const defaultPages: Page[] = [
	{
		id: "page-1",
		title: "Trang 1",
	},
	{
		id: "page-2",
		title: "Trang 2",
	},
	{
		id: "page-3",
		title: "Trang 3",
	},
];

type PageDropdownProps = {
	pages?: Page[];
	value?: string;
	onChange?: (page: Page) => void;
};

export default function KanjiPageIndex({
	pages = defaultPages,
	value,
	onChange,
}: PageDropdownProps) {
	const triggerRef = useRef<View>(null);

	const [open, setOpen] = useState(false);

	const [selectedId, setSelectedId] = useState(
		value ?? pages[0]?.id
	);

	const [dropdownPosition, setDropdownPosition] =
		useState({
			top: 0,
			left: 0,
			width: 0,
		});

	const selectedPage =
		pages.find(
			(page) => page.id === selectedId
		) ?? pages[0];

	const handleOpen = () => {
		triggerRef.current?.measureInWindow(
			(x, y, width, height) => {
				setDropdownPosition({
					top: y + height,
					left: x,
					width,
				});

				setOpen(true);
			}
		);
	};

	const handleSelect = (page: Page) => {
		setSelectedId(page.id);
		setOpen(false);

		onChange?.(page);
	};

	return (
		<>
			{/* DROPDOWN TRIGGER */}
			<View
				ref={triggerRef}
				collapsable={false}
				className="mx-[10px] mt-[10px]"
			>
				<Pressable
					onPress={handleOpen}
					className="h-[48px] flex-row items-center justify-between border border-[#d5d5d5] bg-white px-[14px]"
				>
					<Text className="text-[17px] text-[#222222]">
						{selectedPage?.title}
					</Text>

					<ChevronDown
						size={21}
						color="#555555"
						strokeWidth={1.8}
					/>
				</Pressable>
			</View>

			{/*  MODAL */}
			<Modal
				visible={open}
				transparent
				animationType="none"
				onRequestClose={() => setOpen(false)}
			>
				<View className="flex-1">
					{/* Background */}
					<Pressable
						onPress={() => setOpen(false)}
						className="absolute inset-0"
					/>

					{/* Dropdown */}
					<View
						className="absolute overflow-hidden border border-[#d5d5d5] bg-white"
						style={{
							top: dropdownPosition.top,
							left: dropdownPosition.left,
							width: dropdownPosition.width,
							elevation: 6,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.15,
							shadowRadius: 5,
						}}
					>
						{pages.map((page) => {
							const selected =
								page.id === selectedId;

							return (
								<Pressable
									key={page.id}
									onPress={() =>
										handleSelect(page)
									}
									className={`h-[46px] flex-row items-center justify-between px-[14px] ${selected
										? "bg-[#f3f6fb]"
										: "bg-white"
										}`}
								>
									<Text
										className={`text-[16px] ${selected
											? "font-medium text-[#4169ad]"
											: "text-[#222222]"
											}`}
									>
										{page.title}
									</Text>

									{selected && (
										<Check
											size={19}
											color="#4169ad"
											strokeWidth={2}
										/>
									)}
								</Pressable>
							);
						})}
					</View>
				</View>
			</Modal>
		</>
	);
}