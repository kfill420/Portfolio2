import './Presentation.scss';
import profilePicture from '/images/profilePicture.webp';
import { GoPaperclip } from "react-icons/go";

function Presentation({ enterprise }: { enterprise: string | null }) {
  const downloadCv = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = `docs/CV_${enterprise}.pdf`;
    link.download = `CV_${enterprise}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const downloadLm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = `docs/LM_${enterprise}.pdf`;
    link.download = `LM_${enterprise}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="presentation">
      {/* <Anim className="animation1" iv="iv1"> */}
      <h1 className="presentation_title">
        Développeur Fullstack
      </h1>
      {/* </Anim>
      <Anim className="animation1" iv="iv1"> */}
      {enterprise ?
        <div className="presentation_destination">
          <p className="presentation_description">
            À destination de l'entreprise {enterprise}
          </p>
          <div className="presentation_destination_buttons">
            <a onClick={downloadCv} className="presentation_destination_buttons_btn" type='button'><GoPaperclip /> Curriculum vitae</a>
            <a onClick={downloadLm} className="presentation_destination_buttons_btn" type='button'><GoPaperclip /> Lettre de motivation</a>
          </div>
        </div>
        :
        <p className="presentation_description">
          Je code votre projet à votre goût !
        </p>
      }
      {/* </Anim>

      <Anim className="animation1" iv="iv1"> */}
      <div className="presentation_imgProfil">
        <img
          className="presentation_imgProfil_picture"
          src={profilePicture}
          alt="my profile"
        />
      </div>
      {/* </Anim> */}
    </div>
  );
}

export default Presentation;
