import path from 'path';
import Templates from '@tps/templates';
import * as TPS from '@tps/utilities/constants';
import { isDirAsync } from '@tps/utilities/fileSystem';
import { CommandModule } from 'yargs';
import { getCliArgsFromTemplate } from '@tps/cli/utils/helpers';

interface NewTemplateArgv {
	template: string;
	annotate: boolean;
	type: 'js' | 'json';
	experimental: boolean;
}

export default {
	command: 'template <template>',

	description: 'create a new template',

	builder: async (yargs) => {
		const options = await getCliArgsFromTemplate('new-template');

		yargs.options(options);

		return yargs;
	},

	async handler(argv) {
		const tps = await Templates.get('new-template', {
			tpsPath: TPS.DEFAULT_TPS,
		});

		const answers: Record<string, unknown> = {};

		if (argv.annotate) answers.annotate = argv.annotate;
		if (argv.experimental) answers.experimental = argv.experimental;
		if (argv.type) answers.type = argv.type;

		tps.setAnswers(answers);

		const dest = path.join(TPS.CWD, TPS.TPS_FOLDER);

		if (await isDirAsync(path.join(dest, argv.template))) {
			throw new Error('TPS template is already created.');
		}

		await tps.render(dest, argv.template);

		console.log(`Template created: ${argv.template}`);
	},
} as CommandModule<object, NewTemplateArgv>;
