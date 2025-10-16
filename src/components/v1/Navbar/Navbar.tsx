import './Navbar.css';
import profilePicture from '../img/alexis.png';

function Navbar() {
  return (
    <div className="container_title">
      <h1 className="container_title__titlePage reveal-1">
        Développeur Frontend & Backend
      </h1>
      <p className="container_title__descriptionProfile reveal-2">
        Je code votre projet à votre goût !
      </p>
      <img
        className="container_title__imgProfil reveal-3"
        src={profilePicture}
        alt="my profile"
      />
    </div>
  );
}

export default Navbar;
