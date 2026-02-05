import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { getLocale } from "$lib/paraglide/runtime";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format time for display based on locale
 * FR: 8h30-13h30 (or 14h-16h for round hours)
 * EN: 8:30 AM - 1:30 PM
 * @param timeStr - The time string to format (e.g., "8:30-13:30" or "14:00")
 * @returns Formatted time string
 */
export function formatTime(timeStr: string): string {
	if (!timeStr) return '';
	
	const locale = getLocale();
	const isEn = locale === 'en';
	
	// If time contains a range (e.g., "8:30-13:30" or "14:00-16:00")
	if (timeStr.includes('-')) {
		const [start, end] = timeStr.split('-').map(t => t.trim());
		
		if (isEn) {
			// English format: 8:30 AM - 1:30 PM
			const formatEnglishTime = (time: string) => {
				const [hours, minutes] = time.split(':').map(Number);
				const period = hours >= 12 ? 'PM' : 'AM';
				const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
				return minutes > 0 ? `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}` : `${displayHours} ${period}`;
			};
			return `${formatEnglishTime(start)} - ${formatEnglishTime(end)}`;
		} else {
			// French format: 8h30-13h30
			const formatFrenchTime = (time: string) => {
				const [hours, minutes] = time.split(':');
				return minutes === '00' || !minutes ? `${hours}h` : `${hours}h${minutes}`;
			};
			return `${formatFrenchTime(start)}-${formatFrenchTime(end)}`;
		}
	}
	
	// Single time (e.g., "14:00")
	const [hours, minutes] = timeStr.split(':').map(Number);
	if (isEn) {
		const period = hours >= 12 ? 'PM' : 'AM';
		const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
		return minutes > 0 ? `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}` : `${displayHours} ${period}`;
	} else {
		return minutes > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${hours}h`;
	}
}

/**
 * Add language prefix to a path
 * @param path - The path to localize (e.g., "/about")
 * @returns Localized path (e.g., "/fr/about" or "/en/about")
 */
export function localizeUrl(path: string): string {
	const locale = getLocale();
	// Remove leading slash if present to avoid double slashes
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	return `/${locale}${cleanPath}`;
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};