import React, { useState, useEffect } from 'react';
import FileSystemIcon from '@site/static/img/file-system.svg';
import FolderSlashIcon from '@site/static/img/folder-slash.svg';
import { useType } from '@site/src/hooks/useType';
import styles from './folder.module.css';

interface FileSystemRowProps {
  name: string;
  slash?: boolean;
  animation?: boolean;
  delay?: number;
  start?: boolean;
  onEnd?: () => void;
}

// eslint-disable-next-line arrow-body-style
export const FileSystemRow = ({
  name,
  animation = true,
  slash = false,
  delay = null,
  start = null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onEnd = () => {},
}: FileSystemRowProps) => {
  const { output, ended, started } = useType(name, {
    animation,
    // interval,
    start,
    slash,
    delay,
    onEnd,
  });

  if (!animation) {
    console.log('hello', animation, output, ended, started);
  }

  return (
    <div className={styles.fileRow}>
      {started && <FileSystemIcon className={styles.fileSystem} />}
      <span className={styles.fileName}>{output}</span>
      {slash && ended && (
        <FolderSlashIcon
          className={[styles.fileSystem, styles.folderSlash].join(' ')}
        />
      )}
    </div>
  );
};
