function Comment() {
  return (
    <section className="comment-page">
      <div className="comment-card">
        <div className="comment-header">WHAT OTHERS SAYS</div>
        <div className="comment-main">
          <div className="comment-text">
            {/* ratings */}
            <h2 className="bold">
              "He is a very passionate person, who takes all his works seriously as
              if its his own, kudos to him."
            </h2>
            <p className="description"></p>
            <p className="workplace"></p>
          </div>

          <img src="" alt="Testimonial" className="comment-img" />
        </div>
      </div>
    </section>
  );
}

export default Comment;
