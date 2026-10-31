export type ContentKind = 'POST' | 'SEMINAR' | 'AUTHOR';
export interface ContentQuery {
	filters?: Record<string, string | Record<string, string>>;
	sort?: string | string[];
	pagination?: { page?: number; pageSize?: number; start?: number; limit?: number };
}
export interface PublicRecord {
	kind: ContentKind;
	payload: Record<string, any>;
	publishedAt: string;
	updatedAt: string;
	title: string;
	slug: string;
	category: string;
	eventDate: string | null;
	postId: number | null;
	seminarId: number | null;
	authorId: number | null;
}
export function selectPublications(
	records: PublicRecord[],
	kind: ContentKind,
	params: ContentQuery = {}
) {
	let rows = records.filter((row) => row.kind === kind);
	for (const [field, filter] of Object.entries(params.filters || {})) {
		const column =
			field === 'Slug' || field === 'slug'
				? 'slug'
				: field === 'type'
					? 'category'
					: field === 'date'
						? 'eventDate'
						: undefined;
		if (!column) throw new Error('Unsupported content filter.');
		for (const [op, value] of Object.entries(
			typeof filter === 'string' ? { $eq: filter } : filter
		)) {
			if (
				!['$eq', '$ne', '$gte', '$gt', '$lte', '$lt'].includes(op) ||
				(column !== 'eventDate' && !['$eq', '$ne'].includes(op))
			)
				throw new Error('Unsupported content operator.');
			const expected = column === 'eventDate' ? value.slice(0, 10) : value;
			rows = rows.filter((row) => {
				const actual = row[column];
				if (actual === null) return false;
				return op === '$eq'
					? actual === expected
					: op === '$ne'
						? actual !== expected
						: op === '$gte'
							? actual >= expected
							: op === '$gt'
								? actual > expected
								: op === '$lte'
									? actual <= expected
									: actual < expected;
			});
		}
	}
	const idColumn = kind === 'POST' ? 'postId' : kind === 'SEMINAR' ? 'seminarId' : 'authorId';
	const columns: Record<string, keyof PublicRecord> = {
		id: idColumn,
		publishedAt: 'publishedAt',
		updatedAt: 'updatedAt',
		date: 'eventDate',
		Slug: 'slug',
		slug: 'slug',
		Title: 'title',
		title: 'title',
		LastName: 'title'
	};
	const sort = params.sort || (kind === 'AUTHOR' ? 'LastName' : 'publishedAt:desc');
	const orders = (Array.isArray(sort) ? sort : [sort]).map((item) => {
		const [field, direction = 'asc'] = item.split(':');
		if (!columns[field] || !['asc', 'desc'].includes(direction))
			throw new Error('Unsupported content sort.');
		return { column: columns[field], direction: direction === 'asc' ? 1 : -1 };
	});
	const collator = new Intl.Collator('fr', { sensitivity: 'base' });
	rows.sort((a, b) => {
		for (const { column, direction } of orders) {
			const av = a[column],
				bv = b[column];
			const diff =
				av === bv
					? 0
					: av === null
						? -1
						: bv === null
							? 1
							: typeof av === 'number' && typeof bv === 'number'
								? av - bv
								: collator.compare(String(av), String(bv));
			if (diff) return diff * direction;
		}
		return (a[idColumn] || 0) - (b[idColumn] || 0);
	});
	const take = Math.min(100, params.pagination?.pageSize ?? params.pagination?.limit ?? 100),
		skip = params.pagination?.start ?? ((params.pagination?.page ?? 1) - 1) * take;
	if (
		!Number.isSafeInteger(take) ||
		take < 1 ||
		!Number.isSafeInteger(skip) ||
		skip < 0 ||
		skip > 1000000
	)
		throw new Error('Invalid content pagination.');
	return rows.slice(skip, skip + take);
}
export function todayInParis(now = new Date()) {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Europe/Paris',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
			.formatToParts(now)
			.map((part) => [part.type, part.value])
	);
	return `${parts.year}-${parts.month}-${parts.day}`;
}
