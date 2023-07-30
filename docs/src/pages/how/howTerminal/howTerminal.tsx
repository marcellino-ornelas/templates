import React, { useEffect, useState } from 'react';
import { useType } from '@site/src/hooks/useType';
import { Waypoint } from 'react-waypoint';
import howStyles from '../how.module.css';
import styles from './howTerminal.module.css';

export const HowTerminal = () => {
  const [start, setStart] = useState(false);

  const { output } = useType('tps express-app food-delivery', {
    start,
  });

  return (
    <Waypoint bottomOffset={500} onEnter={() => setStart(true)}>
      <div className={`${howStyles.howContainer} container`}>
        <div className={howStyles.howRow}>
          <div className={howStyles.howCol}>
            <h3 className={howStyles.howHeader}>Create a new Instance</h3>
            <p>
              Generate new instances of you template on the fly with a simple
              command
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
                <p>
                  <span className={styles.terminalCarrot}>&gt;</span>
                  <span className={styles.terminalCommand}>{output}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  );
};
