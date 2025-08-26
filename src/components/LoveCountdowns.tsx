import React from "react";

type CountdownEvent = {
	name: string;
	date: string; // yyyy-mm-dd
	emoji: string;
};

function nextEventDate(month: number, day: number): Date {
	// Luôn lấy event tiếp theo (dù năm nào)
	const now = new Date();
	let year = now.getFullYear();
	let d = new Date(year, month - 1, day);
	if (d < now) d = new Date(year + 1, month - 1, day);
	return d;
}

// Lấy ngày kỷ niệm tròn năm tính từ ngày yêu
function nextAnniversary(startDate: string): Date {
	const d0 = new Date(startDate);
	const now = new Date();
	let next = new Date(d0);
	next.setFullYear(now.getFullYear());
	if (next < now) next.setFullYear(now.getFullYear() + 1);
	return next;
}

const UPCOMING_EVENTS: (startDate: string) => CountdownEvent[] = (
	startDate
) => [
	{
		name: "Kỷ niệm yêu (tròn năm)",
		date: nextAnniversary(startDate).toISOString().slice(0, 10),
		emoji: "💖",
	},
	{
		name: "Valentine",
		date: nextEventDate(2, 14).toISOString().slice(0, 10),
		emoji: "💌",
	},
	{
		name: "White Day",
		date: nextEventDate(3, 14).toISOString().slice(0, 10),
		emoji: "🤍",
	},
	{
		name: "Sinh nhật người ấy",
		date: "1999-03-08", // Cập nhật theo info actual nếu muốn
		emoji: "🎂",
	},
	{
		name: "Giáng sinh",
		date: nextEventDate(12, 24).toISOString().slice(0, 10),
		emoji: "🎄",
	},
];

function daysBetween(a: string, b: string) {
	const d1 = new Date(a);
	d1.setHours(0, 0, 0, 0);
	const d2 = new Date(b);
	d2.setHours(0, 0, 0, 0);
	return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
}

const LoveCountdowns: React.FC<{ startDate: string }> = ({ startDate }) => {
	const nowStr = new Date().toISOString().slice(0, 10);

	const events = React.useMemo(() => {
		let e = UPCOMING_EVENTS(startDate);
		// Nếu event birthday đã qua hôm nay thì lấy năm sau
		e = e.map((ev) => {
			if (ev.name === "Sinh nhật người ấy") {
				const d = new Date();
				const curYear = d.getFullYear();
				let bd = new Date(curYear, 2, 8); // 8/3
				if (bd < d) bd = new Date(curYear + 1, 2, 8);
				return { ...ev, date: bd.toISOString().slice(0, 10) };
			}
			return ev;
		});
		e = e.sort(
			(a, b) => daysBetween(nowStr, a.date) - daysBetween(nowStr, b.date)
		);
		return e;
	}, [startDate, nowStr]);

	return (
		<div className="w-full max-w-2xl mx-auto px-4 mt-1 animate-fade-in">
			<div className="flex flex-wrap gap-2 justify-center">
				{events.map((ev) => {
					const days = daysBetween(nowStr, ev.date);
					return (
						<div
							key={ev.name}
							className="bg-pink-100 border border-pink-200 rounded-xl px-3 py-2 mb-2 flex flex-col items-center text-center shadow-sm">
							<span className="font-bold text-base text-pink-700">
								{ev.emoji} {ev.name}
							</span>
							<span className="text-xs text-pink-500">
								({ev.date})
							</span>
							{days > 0 ? (
								<span className="text-lg text-pink-700 font-semibold">
									{days} ngày nữa
								</span>
							) : (
								<span className="text-green-600 font-bold">
									Hôm nay! 🎉
								</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default LoveCountdowns;
