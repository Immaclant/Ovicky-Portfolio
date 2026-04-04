import OutlinedCard from "./OutlinedCard";



function Sample() {
  return (
    <section className="sample-page">
      <div className="sample-container">
        <div className="sample-header">
          <h1 className="sample-title">Core areas of work</h1>
          <p className="sample-description">
            Navigate through years of scholarly contributions and research
            output
          </p>
        </div>
        <div className="sample-card-wrapper">
          <OutlinedCard className="sample-outlined-card" />
        </div>
      </div>
    </section>
  );
}

export default Sample;
