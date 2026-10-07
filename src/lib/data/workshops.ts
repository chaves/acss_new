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
		name: 'Political Economy + AI Seminar',
		description: [
			'The Political Economy + AI seminar is an online seminar focused on political economy research using AI and computational methods. We welcome work in progress and methods talks on these topics.',
			"Formerly the Public Governance working group, the seminar is organized jointly by King's College London and Université Paris-Dauphine – PSL."
		],
		externalLink: {
			url: 'https://peai-seminar.org',
			text: 'Political Economy + AI seminar'
		},
		schedule: 'Mondays from 17h30 to 18h30 (Paris time)',
		registration: {
			type: 'customWithLinks' as const,
			contacts: [
				{ name: 'Vladimir Avetian', email: 'vladimir.avetian@kcl.ac.uk' },
				{ name: 'Edgar Jimenez Bedolla', email: 'edgar.jimenez-bedolla@dauphine.psl.eu' }
			],
			registrationPageUrl:
				'https://framagroupes.org/sympa/subscribe/dauphine_public_governance?previous_action=info',
			registrationPageText:
				'Register on this page to receive our emails about upcoming presentations.'
		}
	},
	digitalReg: {
		name: 'Digital Regulation',
		description: [
			'The Digital Regulation workshop is an online seminar series focused on digital activities and their regulation.',
			'This working group is developing a joint approach in order to establish a reasoned position on digital regulation in the context of current European (and American) initiatives. In particular, it is considering how to implement responsible governance while allowing for innovation. The issue of the effectiveness of public action and how it relates to competitiveness constraints is also central.'
		],
		externalLink: {
			url: 'https://chairgovreg.fondation-dauphine.fr/en/node/1328',
			text: 'Chair Governance and Regulation'
		},
		registration: {
			type: 'customWithLinks' as const,
			contacts: [
				{ name: 'Damien Mayaux', email: 'damien.mayaux@dauphine.psl.eu' },
				{ name: 'Lucas Eustache', email: 'lucas.eustache@dauphine.psl.eu' }
			],
			registrationPageUrl:
				'https://framagroupes.org/sympa/subscribe/dauphine_digital_regulation?previous_action=info',
			registrationPageText:
				'Register on this page to receive our emails about upcoming presentations.'
		}
	},
	TrEnCE: {
		name: 'Transport, Energy and Climate Economics (TrEnCE)',
		description: [
			'The Transport, Energy and Climate Economics workshop is an online seminar series in the fields of transport, energy and environmental economics.',
			'The group provides a forum for exchange between researchers in these closely related sub-fields. The work is mainly in the field of economics, but contributions from related disciplines are regularly welcomed. The group allows both the presentation of very accomplished work and the discussion of research in progress, enabling authors to benefit from comments to refine their work.'
		],
		externalLink: {
			url: 'https://chairgovreg.fondation-dauphine.fr/en/node/1331',
			text: 'Chair Governance and Regulation'
		},
		registration: {
			type: 'customWithLinks' as const,
			contacts: [{ name: 'Shahmeer Mohsin', email: 'shahmeer.mohsin@dauphine.psl.eu' }],
			registrationPageUrl:
				'https://framagroupes.org/sympa/subscribe/dauphine_transp_energ_clim?previous_action=info',
			registrationPageText:
				'Register on this page to receive our emails about upcoming presentations.'
		}
	}
} as const;

export type WorkshopType = keyof typeof workshops;
