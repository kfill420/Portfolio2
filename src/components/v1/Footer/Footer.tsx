import './Footer.scss';
import Anim from '../Anim/Anim';

function Footer() {
  const birthdate = new Date('1997-06-15');
  const today = new Date();

  const age = today.getFullYear() - birthdate.getFullYear();
  const hasHadBirthdayThisYear = today.getMonth() > birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
  const actualAge = hasHadBirthdayThisYear ? age : age - 1;

  return (
    <div className="footer">
      <div className='footer_part1'>
        <div className='footer_part1_p1'>
          <Anim className="animation1" iv="iv1">
            <h1 className="footer_title">
              DÉVELOPPEUR INFORMATIQUE
            </h1>
          </Anim>
          <Anim className="animation1" iv="iv1">
            <p className="footer_description">
              <strong>Développeur Web front & back-end</strong>, je suis à votre disposition pour répondre à tout type de projets de création de sites internet, de développement spécifique ou d'applications web.
            </p>
            <p className="footer_description">Passionné par les technologies liées au Web, je mets mes compétences au service de vos besoins dans divers domaines.
            </p>
          </Anim>
        </div>
        <div className='footer_part1_p2'>
          <Anim className="animation1" iv="iv1">
            <h1 className="footer_title">
              ALEXIS VIGNOT
            </h1>
          </Anim>
          <Anim className="animation1" iv="iv1">
            <span className="footer_description">
              33310 Lormont
            </span>
          </Anim>
          <Anim className="animation1" iv="iv1">
            <span className="footer_description">
              Mobile sur Bordeaux Métropole
            </span>
          </Anim>
          <Anim className="animation1" iv="iv1">
            <span className="footer_description">
              (+33) 6 78 30 91 08
            </span>
          </Anim>
          <Anim className="animation1" iv="iv1">
            <span className="footer_description">
              alexisvignot@hotmail.fr
            </span>
          </Anim>
          <Anim className="animation1" iv="iv1">
            <span className="footer_description">
              {actualAge} ans
            </span>
          </Anim>
        </div>
      </div>
      <div className='footer_part2'>
        <div>
          <span className="footer_mentions">
            MENTIONS LÉGALES
          </span>
        </div>
        <div>
          <span className="footer_copyright">
            ALEXIS VIGNOT - Copyright © 2024
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
