import { RecursivePartial } from '@tps/types/helpers';
import { Tpsrc } from '@tps/types/tpsrc';
import { vol } from '@test/utilities/vol';
import path from 'path';
import os from 'os';

export const mkTpsrc = (
	pathToTpsrc: string,
	tpsrc: RecursivePartial<Tpsrc>,
) => {
	vol.mkdirSync(path.dirname(pathToTpsrc), { recursive: true });

	vol.writeFileSync(pathToTpsrc, JSON.stringify(tpsrc));
};

const GLOBAL_TPS: string = path.join(os.homedir(), '.tps');
const GLOBAL_TPSRC: string = path.join(GLOBAL_TPS, '.tpsrc');

export const mkGlobalTpsrc = (tpsrc: RecursivePartial<Tpsrc>) => {
	vol.mkdirSync(GLOBAL_TPS, { recursive: true });

	vol.writeFileSync(GLOBAL_TPSRC, JSON.stringify(tpsrc));
};

// export const mkFile = (file: string, data: string) => {
// 	vol.mkdirSync(path.dirname(file), { recursive: true });

// 	vol.writeFileSync(file, data);
// };
