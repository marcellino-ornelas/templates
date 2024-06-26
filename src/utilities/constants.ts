import * as os from 'os';
import * as path from 'path';
import { isDir, findUp } from './fileSystem';

/**
 * Environment
 */
export const IS_TESTING: boolean = process.env.NODE_ENV === 'test';
export const USER_HOME: string = os.homedir();
export const ORIGINAL_CWD = process.cwd();

// TODO: well no longer need to do this when cli tests are changed to not use child process
export const CWD: string = IS_TESTING
	? path.join(ORIGINAL_CWD, '__tests__')
	: ORIGINAL_CWD;
export const MAIN_DIR: string = path.resolve(__dirname, '../../');

/***************************
 * Names
 ****************************/

export const CONFIG_FILE = '.tpsrc';
export const TPS_FOLDER = '.tps';
export const TEMPLATE_SETTINGS_FILE = 'settings';

/***************************
 * Setting and development
 ****************************/

/**
 * global
 */
export const GLOBAL_PATH: string = path.join(USER_HOME, TPS_FOLDER);

export const GLOBAL_CONFIG_PATH: string = path.join(GLOBAL_PATH, CONFIG_FILE);

/**
 * local
 */
const tpsLocal: string = findUp(TPS_FOLDER, CWD);
export const HAS_LOCAL: boolean = tpsLocal && tpsLocal !== GLOBAL_PATH;

/**
 * LOCAL_PATH is any tps folder found in the parent directories
 */
export const LOCAL_PATH: string | null = HAS_LOCAL ? tpsLocal : null;

export const LOCAL_CONFIG_PATH: string | null = HAS_LOCAL
	? path.join(LOCAL_PATH, CONFIG_FILE)
	: null;

/***************************
 * init
 ****************************/

/**
 * path to initialize when calling `tps init`. its always is current working directory
 */
export const INIT_LOCAL_PATH: string = path.normalize(CWD);

/**
 * path of tps folder if tps is initialized in repo
 */
export const INIT_LOCAL_TPS_PATH: string = path.join(
	INIT_LOCAL_PATH,
	TPS_FOLDER,
);

export const IS_TPS_INITIALIZED: boolean = isDir(INIT_LOCAL_TPS_PATH);

export const DEFAULT_TPS = `${MAIN_DIR}/${TPS_FOLDER}`;
