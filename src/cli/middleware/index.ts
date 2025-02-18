import { MiddlewareFunction } from 'yargs';
import dotenv from '@dotenvx/dotenvx';
import findUp from 'find-up';
import { CWD } from '@tps/utilities/constants';

/**
 * Load env variables from a env file. Will search up the file system tree until
 * it finds one or does nothing
 */
const loadEnv: MiddlewareFunction = (args) => {
	if (args.env) {
		const envPath: string | null = findUp.sync('.env', { cwd: CWD });

		dotenv.config({
			path: envPath,
			quiet: true,
			ignore: ['MISSING_ENV_FILE'],
		});
	}
};

export const middleware: MiddlewareFunction[] = [loadEnv];
