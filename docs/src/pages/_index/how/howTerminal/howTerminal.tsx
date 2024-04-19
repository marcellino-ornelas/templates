import React, { useState } from 'react';
import { useType } from '@site/src/hooks/useType';
import { Waypoint } from 'react-waypoint';
import howStyles from '../how.module.css';
import styles from './howTerminal.module.css';

export const HowTerminal = () => {
	const [start, setStart] = useState(false);

	const { output, ended } = useType('tps express-app food-delivery', {
		start,
	});

	const { output: outputPrompt1, ended: prompt1Ended } = useType('3000', {
		start: ended,
	});

	const { output: outputPrompt2 } = useType('y', {
		start: prompt1Ended,
	});

	return (
		<Waypoint bottomOffset={500} onEnter={() => setStart(true)}>
			<div className={`${howStyles.howContainer} container`}>
				<div className={howStyles.howRow}>
					<div className={`${howStyles.howCol} ${styles.terminalSpacing}`}>
						<h4 className={howStyles.howStep}>Step 2</h4>
						<h3 className={howStyles.howHeader}>Create a new Instance</h3>
						<p>
							Create new instances of your template on the fly! Answer your
							templates prompts to fit your current projects needs. Optionally,
							create a configuration file for your project to pre-fill template
							prompts without manually answering each one.
						</p>
					</div>
					<div className={howStyles.howCol}>
						<div className={styles.terminal}>
							<div className={styles.terminalHeader}>
								<div className={styles.terminalCircle} />
								<div className={styles.terminalCircle} />
								<div className={styles.terminalCircle} />
							</div>
							<div className={styles.terminalBody}>
								<p className={styles.terminalLine}>
									<span className={styles.terminalCarrot}>&gt;</span>
									<span className={styles.terminalCommand}>{output}</span>
								</p>

								{ended && (
									<p className={styles.terminalLine}>
										<span className={styles.terminalPromptSign}>?</span>
										<span className={styles.terminalPromptQuestion}>
											What port would you like to use?
										</span>
										<span className={styles.terminalCommand}>
											{outputPrompt1}
										</span>
									</p>
								)}
								{prompt1Ended && (
									<p className={styles.terminalLine}>
										<span className={styles.terminalPromptSign}>?</span>
										<span className={styles.terminalPromptQuestion}>
											Would you like to add eslint?
										</span>
										<span className={styles.terminalPromptDefault}>(Y/n)</span>
										<span className={styles.terminalCommand}>
											{outputPrompt2}
										</span>
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Waypoint>
	);
};
