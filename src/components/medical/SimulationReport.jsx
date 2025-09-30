// /components/simulation/SimulationReport.jsx
const SimulationReport = ({ objectives }) => {
  const score = objectives.filter(o => o.achieved).length;
  const total = objectives.length;

  return (
    <div className="simulation-report">
      <h2>Simulation terminée</h2>
      <p>Score : {score} / {total}</p>

      <ul>
        {objectives.map(obj => (
          <li key={obj.id}>
            {obj.title} : {obj.achieved ? "✅ Atteint" : "❌ Non atteint"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimulationReport;
