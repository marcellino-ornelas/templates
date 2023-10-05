import React, { useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { FileSystemRow, Folder } from '../folder';
import howStyles from '../how.module.css';
import styles from './howResult.module.css';

export const HowResult = () => {
	const [start, setStart] = useState(false);

	return (
		<Waypoint bottomOffset={600} onEnter={() => setStart(true)}>
			<div className={styles.resultContainer}>
				<div className={`${howStyles.howContainer} container`}>
					<div className={styles.resultDescriptionContainer}>
						<h4 className={howStyles.howStep}>Step 3</h4>
						<h3 className={howStyles.howHeader}>Watch the Magic Unfold</h3>
						<p>
							Experience the magic as your customized template generates an
							out-of-the-box running project effortlessly. Your new template
							instance will be rendered, setting up an entire file structure,
							dependencies, and even providing a fully functional project that
							you can run immediately.
						</p>
					</div>

					<div className={howStyles.howRow}>
						<div className={`${howStyles.howCol} ${styles.folder1}`}>
							<Folder
								name="express-app"
								animation={false}
								key="result_template"
							>
								<Folder name="controllers" />

								<FileSystemRow name="eslint.config.js" />

								<FileSystemRow name="package.json" />

								<FileSystemRow name="server.js.dot" />
							</Folder>
						</div>
						<div className={howStyles.howCol}>
							<Folder name="food-delivery" start={start} key="result_answer">
								<Folder name="controllers" />

								<FileSystemRow name="eslint.config.js" />

								<FileSystemRow name="package.json" />

								<FileSystemRow name="server.js" />
							</Folder>
						</div>
					</div>
				</div>
			</div>
		</Waypoint>
	);
};
