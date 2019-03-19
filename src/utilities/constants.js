import os from 'os';
import path from 'path';
import utils from '../../lib/utils';

export const USER_HOME = os.homedir();
export const MAIN_DIR = path.resolve(__dirname, '../../');

/***************************
 * Names
 ****************************/

export const SETTINGS_FILE = '.tpsrc';
export const TPS_FOLDER = '.tps';

/***************************
 * Setting and development
 ****************************/

/**
 * global
 */
export const GLOBAL_PATH = path.join(USER_HOME, TPS_FOLDER);

export const GLOBAL_CONFIG_PATH = path.join(GLOBAL_PATH, SETTINGS_FILE);

export const HAS_GLOBAL = utils.isDir(GLOBAL_PATH);

/**
 * local
 */
const tps_local = utils.findUp(TPS_FOLDER);
const has_local = tps_local && tps_local !== GLOBAL_PATH;

export const LOCAL_PATH = has_local ? tps_local : null;

export const LOCAL_CONFIG_PATH = has_local
  ? path.join(LOCAL_PATH, SETTINGS_FILE)
  : null;

export const INIT_LOCAL_PATH = path.join(process.cwd(), TPS_FOLDER);
export const MAIN_TPS = `${MAIN_DIR}/${TPS_FOLDER}`;
