import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { FileSystemRow, Folder } from '../folder';
import howStyles from '../how.module.css';
import styles from './howTemplate.module.css';

export const HowTemplate = () => {
	const [start, setStart] = useState(false);

	return (
		<Waypoint bottomOffset={500} onEnter={() => setStart(true)}>
			<div className={styles.templateContainer}>
				<div className={`${howStyles.howContainer} container`}>
					<h2 className={`${styles.header}`}>How it works</h2>
					<div className={`${howStyles.howRow}`}>
						<div className={`${howStyles.howCol} ${styles.reverse}`}>
							<Folder name="express-app" start={start} key="template">
								<Folder name="controllers" />

								<FileSystemRow name="eslint.config.js" delay={500} />

								<FileSystemRow delay={750} name="package.json" />

								<FileSystemRow delay={1000} name="server.js.dot" />
							</Folder>
						</div>
						<div className={howStyles.howCol}>
							<h4 className={howStyles.howStep}>Step 1</h4>
							<h3 className={howStyles.howHeader}>Create a Template</h3>
							<p>
								Build your own blueprint. Set up your directory structure,
								source files, and configurations. Define prompts to make your
								template dynamic and adapt to different use cases. Whether your
								building an entire project scaffold or specific pieces to your
								current project, templates can handle it all.
								<br />
								<br />
								Your template, your rules!
							</p>
						</div>
					</div>
				</div>
			</div>
		</Waypoint>
	);
};
