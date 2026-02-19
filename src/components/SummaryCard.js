function SummaryCard({ title, value, color }) {
  return (
    <div className="col-md-4">
      <div className={`card text-white bg-${color} mb-3`}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h4>{value}</h4>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;