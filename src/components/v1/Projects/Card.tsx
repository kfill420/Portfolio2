import { useState } from 'react';
import './Projects.scss';
import { useAppDispatch } from '../../../hooks/redux';
import { actionCardInfoVisible } from '../../../store/reducer/cardInfo';
import type { ProjetKeys } from '../../../store/reducer/cardInfo';
import { Star } from 'react-feather';
import Anim from '../Anim/Anim';
import ProjetLabel from "./ProjetLabel/ProjetLabel";

interface CardProps {
  title: ProjetKeys;
  description: string;
  img: string;
  url?: string;
  inProgress?: boolean;
  bestProject?: boolean;
  info?: boolean;
  technos?: string[];
  github?: string;
}

function Card({ title, description, img, url, inProgress, bestProject, info, technos, github }: CardProps) {
  const [btnCliquable, setBtnCliquable] = useState(false);
  const dispatch = useAppDispatch();
  const projet = title;

  const handleHover = () => {
    setBtnCliquable(true);
  }

  const handleClick = () => {
    if (btnCliquable)
      dispatch(actionCardInfoVisible({ projet }))
  };

  return (
    <>
      <Anim className="animation1 card_container" iv="iv1" >
        <div className='card' onMouseEnter={() => handleHover()} onMouseLeave={() => setBtnCliquable(false)}>
          <img src={img} alt="project representation" className="card_background" />
          {inProgress && <span className="card_label">En construction</span>}
          {bestProject && <Star className="card_star"></Star>}
          {technos && technos.length > 0 && ProjetLabel({ technos })}
          {/* {
              github && 
              <button
                  type="button"
                  className="card_content_github"
                  onClick={() => btnCliquable && window.open(github, '_blank')}
                >
                  git
                </button>
            } */}
          <div className="card_content">
            <h3 className="card_content_title">{title}</h3>
            <span className="card_content_description">{description}</span>

            {info && url &&
              <div className="card_content_buttons">
                <button
                  type="button"
                  className="card_content_buttons_button"
                  onClick={() => handleClick()}
                >
                  Info
                </button>

                <button
                  type="button"
                  className={info ? "card_content_buttons_button" : "card_content_buttons_button card_content_buttons_button-solo"}
                  onClick={() => btnCliquable && window.open(url, '_blank')}
                >
                  Voir
                </button>
              </div>
            }
            {info && !url &&
              <div className="card_content_buttons">
                <button
                  type="button"
                  className="card_content_buttons_button card_content_buttons_button-solo"
                  onClick={() => handleClick()}
                >
                  Info
                </button>
              </div>
            }

            {!info && url &&
              <div className="card_content_buttons">
                <button
                  type="button"
                  className={info ? "card_content_buttons_button" : "card_content_buttons_button card_content_buttons_button-solo"}
                  onClick={() => btnCliquable && window.open(url, '_blank')}
                >
                  Voir
                </button>
              </div>
            }
            
          </div>
        </div>

      </Anim>
    </>


  );
}

export default Card;

