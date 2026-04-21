function Home() {
  return (
    <section className="flex bg-blue-100 h-168 p-6">
      <div className="landing">
        <div className=" flex space-y-4">
          <p className="role">Researcher</p>
          <span className="separator">.</span>
          <p className="role">Writer</p>
          <span className="separator">.</span>
          <p className="role">Lecturer</p>
        </div>
        <h2 className="headline">
          Exploring the <span className="highlighted-text">Frontiers</span> of
          Knowledge
        </h2>
        <p className="typewriter">typewriter effect|</p>
        <div className="actions">
          <button className="btn btn-primary">View Publications</button>
          <button className="btn btn-secondary">About</button>
        </div>
      </div>
    </section>
  );
}
export default Home;
