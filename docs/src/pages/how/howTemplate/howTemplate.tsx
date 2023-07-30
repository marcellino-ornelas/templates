import React, { useEffect, useState } from 'react';
import { FileSystemRow, Folder } from '../folder';
import howStyles from '../how.module.css';
import styles from './howTemplate.module.css';

export const HowTemplate = () => {
  return (
    <div className={styles.templateContainer}>
      <div className={`${howStyles.howContainer} container`}>
        <div className={howStyles.howRow}>
          <div className={howStyles.howCol}>
            <Folder name="express-app">
              <Folder name="controllers" />

              <FileSystemRow name="eslint.config.js" delay={500} />

              <FileSystemRow delay={750} name="package.json" />

              <FileSystemRow delay={1000} name="server.js" />
            </Folder>
          </div>
          <div className={howStyles.howCol}>
            <h3 className={howStyles.howHeader}>Create a Template</h3>
            <p>
              Create a collection of file and folder and place it into a
              template folder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
