import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

import { TemplatesLibrariesPlugin } from './plugins';

const keywords = [
	'web',
	'tool',
	'scaffold',
	'boilerplate',
	'generator',
	'generate',
	'template',
	'templates',
	'build-tools',
	'tps',
	'cli',
	'library',
	'starter',
	'node',
	'cli-app',
	'cli',
	'front-end',
	'development',
	'dev',
	'build',
	'stack',
	'app',
	'react',
	'typescript',
	'yargs',
].join(', ');

const config: Config = {
	title: 'Templates',
	tagline:
		'Supercharge Your Development with Templates: Code Faster, Build Better!',

	// Set the production url of your site here
	url: 'https://marcellino-ornelas.github.io',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/templates/',

	plugins: [
		[
			TemplatesLibrariesPlugin,
			{
				templates: [
					'react-component',
					'yargs-cli-cmd',
					'express-app',
					'react-app',
					'tps-ai',
				],
			},
		],
		'@docusaurus/theme-live-codeblock',
		'@docusaurus/plugin-sitemap',
	],

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'marcellino-ornelas', // Usually your GitHub org/user name.
	projectName: 'templates', // Usually your repo name.
	trailingSlash: false,

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	markdown: {
		mermaid: true,
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						'https://github.com/marcellino-ornelas/templates/tree/master/docs',
				},
				// blog: {
				//   showReadingTime: true,
				//   // Please change this to your repo.
				//   // Remove this to remove the "edit this page" links.
				//   editUrl:
				//     'https://github.com/marcellino-ornelas/templates/tree/master/docs',
				// },
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
				gtag: {
					trackingID: 'G-X6LWJQY18G',
					anonymizeIP: true,
				},
			},
		],
	],

	headTags: [
		{
			tagName: 'link',
			attributes: {
				rel: 'icon',
				href: '/templates/img/templates-logo.ico',
				type: 'image/x-icon',
				media: '(prefers-color-scheme: light)',
			},
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'icon',
				href: '/templates/img/templates-logo-dark.ico',
				type: 'image/x-icon',
				media: '(prefers-color-scheme: dark)',
			},
		},
		// SEO json-ld
		{
			tagName: 'script',
			attributes: {
				type: 'application/ld+json',
			},
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: 'Templates',
				url: 'https://marcellino-ornelas.github.io/templates/',
				author: {
					'@type': 'Person',
					name: 'Marcellino Ornelas',
				},
				description:
					"Templates is a scaffolding framework built to streamline development workflows. It makes code generation simple, dynamic, and reusable—whether you're scaffolding individual files, parts of your application, or full project structures. Say goodbye to copy-pasting code and let Templates handle the heavy lifting, so you can focus on building what matters!",
				image: [
					'https://marcellino-ornelas.github.io/img/templates-logo.svg',
					// 'https://marcellino-ornelas.github.io/templates/logo.png',
				],
				// "thumbnailUrl": "https://marcellino-ornelas.github.io/templates/social-card.png",
				applicationCategory: 'DeveloperTool',
				operatingSystem: 'All',
				additionalType: 'https://schema.org/SoftwareFramework',
				publisher: {
					'@type': 'Organization',
					name: 'Templates',
					url: 'https://marcellino-ornelas.github.io/templates/',
				},
				keywords,
				codeRepository: 'https://github.com/marcellino-ornelas/templates',
				documentation:
					'https://marcellino-ornelas.github.io/templates/docs/main/intro',
				programmingLanguage: 'JavaScript',
				softwareRequirements: 'Node.js',
				potentialAction: [
					{
						'@type': 'ViewAction',
						name: 'Browse available templates',
						target:
							'https://marcellino-ornelas.github.io/templates/docs/main/templates',
					},
					{
						'@type': 'CreateAction',
						name: 'Create a new template',
						target:
							'https://marcellino-ornelas.github.io/templates/?action=create',
					},
					{
						'@type': 'InstallAction',
						name: 'Install Templates CLI',
						target:
							'https://marcellino-ornelas.github.io/templates/docs/main/intro#installation',
					},
					{
						'@type': 'ViewAction',
						name: 'Read the documentation',
						target:
							'https://marcellino-ornelas.github.io/templates/docs/main/intro',
					},
				],
			}),
		},
	],
	themeConfig: {
		// Replace with your project's social card
		//   image: 'img/docusaurus-social-card.jpg',
		metadata: [
			{
				name: 'keywords',
				content: keywords,
			},
			// { name: 'twitter:card', content: 'summary_large_image' },
		],
		navbar: {
			title: 'Templates',
			logo: {
				alt: 'Templates Logo',
				src: 'img/templates-logo.svg',
				srcDark: 'img/templates-logo-dark.svg',
				href: '/',
				target: '_self',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'docs',
					position: 'left',
					label: 'Docs',
				},
				{
					type: 'docSidebar',
					sidebarId: 'api',
					position: 'left',
					label: 'API',
				},
				{
					label: 'Playground',
					to: '/playground/',
					position: 'left',
				},
				{
					href: 'https://github.com/marcellino-ornelas/templates/issues',
					label: 'Feedback',
					position: 'right',
				},
				//   { to: '/blog', label: 'Blog', position: 'left' },
				{
					href: 'https://github.com/marcellino-ornelas/templates',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			logo: {
				alt: 'Templates Logo',
				// Always use white logo
				src: 'img/templates-logo-dark.svg',
				width: 75,
				height: 75,
				href: '/',
				target: '_self',
			},
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Docs',
							to: 'docs/main/intro',
						},
						{
							label: 'Api',
							to: 'docs/api/',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Stack Overflow',
							href: 'https://stackoverflow.com/questions/tagged/templates-mo',
						},
						{
							label: 'Discussions',
							href: 'https://github.com/marcellino-ornelas/templates/discussions',
						},
						{
							label: 'Help',
							href: 'https://github.com/marcellino-ornelas/templates/discussions/categories/q-a',
						},
						//   {
						//     label: 'Discord',
						//     href: 'https://discordapp.com/invite/docusaurus',
						//   },
						//   {
						//     label: 'Twitter',
						//     href: 'https://twitter.com/docusaurus',
						//   },
					],
				},
				{
					title: 'More',
					items: [
						//   {
						//     label: 'Blog',
						//     to: '/blog',
						//   },
						{
							label: 'GitHub',
							href: 'https://github.com/marcellino-ornelas/templates',
						},
						{
							label: 'GitHub Issues',
							href: 'https://github.com/marcellino-ornelas/templates/issues',
						},
						{
							label: 'Roadmap',
							href: 'https://github.com/users/marcellino-ornelas/projects/2',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Marcellino Ornelas, Inc. Built with Docusaurus.`,
		},
		prism: {
			theme: themes.github,
			darkTheme: themes.dracula,
			additionalLanguages: ['bash', 'json'],
		},
	},
	themes: ['@docusaurus/theme-mermaid'],
};

export default config;
