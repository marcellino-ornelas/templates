import React, { useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { FileSystemRow, Folder } from '../folder';
import howStyles from '../how.module.css';
import styles from './howResult.module.css';

export const HowResult = () => {
  const [start, setStart] = useState(false);

  return (
    <Waypoint bottomOffset={500} onEnter={() => setStart(true)}>
      <div className={styles.resultContainer}>
        <div className={`${howStyles.howContainer} container`}>
          <h2 className={howStyles.howHeader}>Creating ... </h2>
          <div className={howStyles.howRow}>
            <div className={howStyles.howCol}>
              <Folder name="express-app" animation={false}>
                <Folder name="controllers" />

                <FileSystemRow name="server.js" />

                <FileSystemRow name="package.json" />

                <FileSystemRow name="eslint.config.js" />
              </Folder>
            </div>
            <div className={howStyles.howCol}>
              <Folder name="food-delivery" start={start}>
                <Folder name="controllers" />

                <FileSystemRow name="server.js" />

                <FileSystemRow name="package.json" />

                <FileSystemRow name="eslint.config.js" />
              </Folder>
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  );
};
