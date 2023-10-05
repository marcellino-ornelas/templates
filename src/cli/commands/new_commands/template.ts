import path from 'path';
import Template from '@tps/templates';
import * as TPS from '@tps/utilities/constants';
import { isDir } from '@tps/utilities/fileSystem';
import { CommandModule } from 'yargs';

interface NewTemplateArgv {
	template: string;
}

export default {
	command: 'template <template>',

	description: 'create a new template',

	builder: {},

	handler(argv) {
		const tps = new Template('new-template', {
			tpsPath: TPS.DEFAULT_TPS,
		});

		const dest = path.join(process.cwd(), TPS.TPS_FOLDER);

		if (isDir(path.join(dest, argv.template))) {
			throw new Error('TPS template is already created.');
		}

		tps
			.render(dest, argv.template)
			.then(() => {
				console.log(`Template created: ${argv.template}`);
			})
			.catch((err) => {
				console.error(err);
				process.exit(1);
			});
	},
} as CommandModule<object, NewTemplateArgv>;
