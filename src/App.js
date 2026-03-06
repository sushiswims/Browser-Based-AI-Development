import { useState } from "react";
import "./App.css";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import RunningExercise from "./components/RunningExercise";

const exercises = [
  { id: 1, name: "Push Ups", type: "repetition" },
  { id: 2, name: "Running", type: "duration" },
  { id: 3, name: "Plank", type: "duration" },
  { id: 4, name: "Morning Run", type: "running" },
];

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBackToMain = () => {
    setSelectedExercise(null);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let exerciseScreen = null;
  if (selectedExercise) {
    if (selectedExercise.type === "repetition") {
      exerciseScreen = (
        <RepetitionExercise name={selectedExercise.name} onBack={handleBackToMain} />
      );
    } else if (selectedExercise.type === "duration") {
      exerciseScreen = (
        <DurationExercise name={selectedExercise.name} onBack={handleBackToMain} />
      );
    } else if (selectedExercise.type === "running") {
      exerciseScreen = (
        <RunningExercise name={selectedExercise.name} onBack={handleBackToMain} />
      );
    }
  }

  return (
    <div className="App">
      <h1>Exercise Tracker</h1>
      {!selectedExercise && (
        <div>
          <h2>Select an Exercise</h2>
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredExercises.map((exercise) => (
            <button key={exercise.id} onClick={() => setSelectedExercise(exercise)}>
              {exercise.name} ({exercise.type})
            </button>
          ))}
        </div>
      )}
      {selectedExercise && (
        <div style={{ marginTop: "20px" }}>{exerciseScreen}</div>
      )}
    </div>
  );
}

export default App;