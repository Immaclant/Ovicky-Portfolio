// import image from "../assets/images/placeholder-logo.jpg";
import Home from "../components/Home";
import Achievements from "../components/Achievements";
import Sample from "../components/Sample";
import Comment from "../components/comment";

function Landing() {
  // function mouseOut(event) {
  //   const roles = event.currentTarget.querySelectorAll(".role");
  //   roles.forEach((role) => {
  //     role.style.transform = "translateY(-5px)";
  //     role.style.transition = "1s ease";
  //   });
  // }

  return (
    <main className="main">
      <Home />
      <Achievements />
      <Sample />
      <Comment />
    </main>
  );
}
export default Landing;
