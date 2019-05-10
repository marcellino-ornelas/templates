import os from 'os';
import path from 'path';
import { isDir, findUp } from './fileSystem';

/**
 * Environment
 */
export const IS_TESTING = process.env.NODE_ENV === 'test';
export const USER_HOME = os.homedir();
export const CWD = process.cwd();
export const MAIN_DIR = path.resolve(__dirname, '../../');

/***************************
 * Names
 ****************************/

export const CONFIG_FILE = '.tpsrc';
export const TPS_FOLDER = '.tps';
export const TEMPLATE_SETTINGS_FILE = 'settings.json';

/***************************
 * Setting and development
 ****************************/

/**
 * global
 */
export const GLOBAL_PATH = path.join(USER_HOME, TPS_FOLDER);

export const GLOBAL_CONFIG_PATH = path.join(GLOBAL_PATH, CONFIG_FILE);

export const HAS_GLOBAL = isDir(GLOBAL_PATH);

/**
 * local
 */
const tpsLocal = findUp(TPS_FOLDER);
const hasLocal = tpsLocal && tpsLocal !== GLOBAL_PATH;

export const LOCAL_PATH = hasLocal ? tpsLocal : null;

export const LOCAL_CONFIG_PATH = hasLocal
  ? path.join(LOCAL_PATH, CONFIG_FILE)
  : null;

export const INIT_LOCAL_PATH = path.join(process.cwd());
export const MAIN_TPS = `${MAIN_DIR}/${TPS_FOLDER}`;
