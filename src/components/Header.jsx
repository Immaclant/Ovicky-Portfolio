import image from "../assets/images/placeholder-logo.jpg";

function Header() {
  return (
    <div className="header-container">
      <h1 className="header-textname">Dr Fehintola Victor</h1>
      {/* <img className="header-img" src={image} alt="logo" width={100} /> */}
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li className="header-nav-item">
            <a href="" className="header-nav-link">
              Home
            </a>
          </li>
          <li className="header-nav-item">
            <a href="" className="header-nav-link">
              About
            </a>
          </li>
          <li className="header-nav-item">
            <a href="" className="header-nav-link">
              Publications
            </a>
          </li>
          <li className="header-nav-item">
            <a href="" className="header-nav-link">
              Contacts
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
