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
                Let your creativity flow as you design and create a template
                that holds all the code, file structure, and configurations you
                want. Make it truly yours by setting up prompts and
                customizations, so it easily adjusts to different project needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  );
};
