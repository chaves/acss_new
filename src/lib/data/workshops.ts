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
	},
	digitalReg: {
		name: 'Digital Regulation',
		description: [
			'The Digital Regulation workshop is an online seminar series focused on digital activities and their regulation.',
			'This working group is developing a joint approach in order to establish a reasoned position on digital regulation in the context of current European (and American) initiatives. In particular, it is considering how to implement responsible governance while allowing for innovation. The issue of the effectiveness of public action and how it relates to competitiveness constraints is also central.'
		],
		schedule: 'Online seminar series',
		externalLink: {
			url: 'https://www.chaire-regulationdunumerique.fr/',
			text: 'Chair Governance and Regulation'
		},
		registration: {
			type: 'contacts' as const,
			contacts: [
				{ name: 'Damien Mayaux', email: 'damien.mayaux@dauphine.psl.eu' },
				{ name: 'Lucas Eustache', email: 'lucas.eustache@dauphine.psl.eu' }
			]
		}
	},
	TrEnCE: {
		name: 'Transport, Energy and Climate Economics (TrEnCE)',
		description: [
			'The Transport, Energy and Climate Economics workshop is an online seminar series in the fields of transport, energy and environmental economics.',
			'The group provides a forum for exchange between researchers in these closely related sub-fields. The work is mainly in the field of economics, but contributions from related disciplines are regularly welcomed. The group allows both the presentation of very accomplished work and the discussion of research in progress, enabling authors to benefit from comments to refine their work.'
		],
		schedule: 'Online seminar series',
		externalLink: {
			url: 'https://www.chaire-regulationdunumerique.fr/',
			text: 'Chair Governance and Regulation'
		},
		registration: {
			type: 'contacts' as const,
			contacts: [
				{ name: 'Shahmeer Mohsin', email: 'shahmeer.mohsin@dauphine.psl.eu' }
			]
		}
	}
} as const;

export type WorkshopType = keyof typeof workshops;
