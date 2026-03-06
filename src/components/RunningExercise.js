import React, { useState, useEffect, useRef } from 'react';

function RunningExercise({ name }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const recordLap = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLaps(prev => [...prev, { elapsed: fmt(seconds), time: timeStr, num: prev.length + 1 }]);
  };

  const reset = () => {
    setRunning(false);
    setSeconds(0);
    setLaps([]);
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{fmt(seconds)}</p>
      <button onClick={() => setRunning(r => !r)}>
        {running ? 'Pause' : 'Start'}
      </button>
      <button onClick={recordLap} disabled={!running}>
        Lap
      </button>
      <button onClick={reset}>Reset</button>

      {laps.length > 0 && (
        <ul>
          {laps.map((lap) => (
            <li key={lap.num}>
              Lap {lap.num} — {lap.elapsed} (recorded at {lap.time})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RunningExercise;