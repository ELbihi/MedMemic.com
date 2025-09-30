// /components/simulation/PhaseViewer.jsx
const PhaseViewer = ({ phase, onActionChoice }) => {
  return (
    <div className="phase-viewer">
      <h2>{phase.nom_phase}</h2>
      <p>{phase.description}</p>

      {phase.actions?.map((action, idx) => (
        <button
          key={idx}
          onClick={() => onActionChoice(action)}
          style={{
            backgroundColor: action.correct ? "#4caf50" : "#f44336",
            color: "white",
            margin: "5px",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default PhaseViewer;
