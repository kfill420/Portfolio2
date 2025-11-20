import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { actionCardInfoVisible } from '../../../store/reducer/cardInfo';
import './CardInfoInobank.scss';

function CardInfoCasalink() {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleQuit();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  useEffect(() => {
    setIsVisible(true);

    return () => setIsVisible(false);
  }, []);

  const handleQuit = () => {
    dispatch(actionCardInfoVisible({ projet: "InoBank" }));
  }

  return (
    <div className="cardInfoIB">
      <div className={isVisible ? "cardInfoIB_background cardInfoIB_background-isVisible" : "cardInfoIB_background"} onClick={handleQuit} />
      <div className={isVisible ? "cardInfoIB_content cardInfoIB_content-isVisible" : "cardInfoIB_content"}>

        <video controls>
          <source src="videos/inobank.webm" type="video/webm" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

      </div>
    </div>
  );
}

export default CardInfoCasalink;
