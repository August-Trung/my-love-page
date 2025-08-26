import React from "react";
import { getLoveDays } from "./LoveCounter";

const MILESTONES = [100, 200, 300, 365, 500, 730, 1000];

type Props = {
	startDate: string;
};

const formatDate = (d: Date) =>
	d.toLocaleDateString("vi-VN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

const LoveMilestones: React.FC<Props> = ({ startDate }) => {
	const loveDays = getLoveDays(startDate);
	const matched = MILESTONES.filter((m) => loveDays >= m);

	// Ngày đạt dc mốc
	const dateFromMilestone = (milestone: number) => {
		const d = new Date(startDate);
		d.setDate(d.getDate() + milestone - 1);
		return d;
	};

	if (matched.length === 0) return null;

	return (
		<div className="w-full max-w-2xl mx-auto px-4 mt-4 animate-fade-in">
			<div className="flex flex-wrap gap-2 justify-center">
				{matched.map((m) => (
					<div
						key={m}
						className="bg-pink-50 border border-pink-200 rounded-xl px-3 py-2 mb-2 flex flex-col items-center text-center shadow-sm hover:scale-105 transition-transform">
						<span className="font-bold text-xl text-pink-700">
							{m} ngày
						</span>
						<span className="text-xs text-pink-400">
							{formatDate(dateFromMilestone(m))}
						</span>
						<span className="text-base">🎉 Đã đạt được!</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default LoveMilestones;
