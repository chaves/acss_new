/**
 * Workshop descriptions and contact information
 * Single source of truth for all workshop pages
 */

export const workshops = {
	nlp: {
		name: 'AI & NLP Workshop',
		description: [
			'The aim of this workshop is to promote technical and practical exchanges between researchers who use NLP methods. There is no hesitation in detailing the code (r/python), sharing tips, and discovering new methods and models.'
		],
		schedule: 'Thursdays from 12h15 to 13h30, by videoconference',
		registration: {
			type: 'form' as const,
			url: 'https://forms.gle/f9yfq5nxUYcbQdkT6',
			text: 'please fill the form'
		}
	},
	pub: {
		name: 'Public Governance Workshop',
		description: [
			'The Public Governance workshop is an online seminar series focused on state of art research in political economy that uses non-traditional data and data-intensive methods.',
			'The workshop gives a platform for the research on the role of governance in designing and developing better policies. Key features are the political environment, the role of the media, the engagement of stakeholders such as civil society and firms, the market structure and level of competition, and the independence of public regulators, among others. Particular emphasis is placed on research with NLP methods due to the proven usefulness of transforming text into data for further econometric analysis.'
		],
		schedule: 'Mondays from 17h30 to 19h',
		registration: {
			type: 'contacts' as const,
			contacts: [
				{ name: 'Vladimir Avetian', email: 'vladimir.avetian@dauphine.psl.eu' },
				{ name: 'Edgar Jimenez Bedolla', email: 'edgar.jimenez-bedolla@dauphine.psl.eu' }
			]
		}
	}
} as const;

export type WorkshopType = keyof typeof workshops;
