import React, { useEffect, useState } from 'react';
import { animated, useTrail } from '@react-spring/web';
import { FileSystemRow } from './fileSystemRow';
import styles from './folder.module.css';

interface FolderProps {
  name: string;
  children?: React.ReactNode[];
  delay?: number;
  start?: boolean;
  animation?: boolean;
}

export const Folder = ({
  children = [],
  name,
  delay = null,
  start = null,
  animation = true,
}: FolderProps) => {
  const items = React.Children.toArray(children);
  const [end, setEnd] = useState(false);
  // eslint-disable-next-line no-nested-ternary
  const startOption = start === null ? 1 : start === true ? 1 : 0;

  const [trails] = useTrail(
    items.length,
    animation
      ? {
          from: { opacity: 0, x: -30, y: -30 },
          to: { opacity: startOption, x: 0, y: 0 },
          delay: 1250 + (delay || 0),
          config: {
            duration: 1000,
          },
        }
      : {
          from: { opacity: 1, x: 0, y: 0 },
          to: { opacity: 1, x: 0, y: 0 },
        },
    [start, animation]
  );

  useEffect(() => {
    if (!animation) setEnd(true);
  }, [animation]);

  return (
    <div className={styles.folder}>
      <FileSystemRow
        name={name}
        slash
        delay={delay}
        start={start}
        animation={animation}
        onEnd={() => {
          setEnd(true);
        }}
      />
      {end && (
        <div className={styles.folderChildren}>
          {trails.map((style, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <animated.div key={`${name}_${i}`} style={style}>
              {React.cloneElement(items[i] as any, {
                delay: (items[i] as any)?.props?.delay || 0,
                start,
                animation,
              })}
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};
