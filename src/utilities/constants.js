import os from 'os';
import path from 'path';
import { isDir, findUp } from './fileSystem';

export const USER_HOME = os.homedir();
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
const tps_local = findUp(TPS_FOLDER);
const has_local = tps_local && tps_local !== GLOBAL_PATH;

export const LOCAL_PATH = has_local ? tps_local : null;

export const LOCAL_CONFIG_PATH = has_local
  ? path.join(LOCAL_PATH, CONFIG_FILE)
  : null;

export const INIT_LOCAL_PATH = path.join(process.cwd());
export const MAIN_TPS = `${MAIN_DIR}/${TPS_FOLDER}`;
