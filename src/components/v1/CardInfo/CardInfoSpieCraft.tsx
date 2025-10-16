import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { actionCardInfoVisible } from '../../../store/reducer/cardInfo';
import './CardInfoSpieCraft.scss';

function CardInfoSpieCraft() {
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
    dispatch(actionCardInfoVisible({ projet: "Spiecraft" }));
  }

  return (
    <div className="cardInfoSpiecraft">
      <div className={isVisible ? "cardInfo_background cardInfo_background-isVisible" : "cardInfo_background"} onClick={handleQuit} />
      <div className={isVisible ? "cardInfo_content cardInfo_content-isVisible" : "cardInfo_content"}>
        <h2 className="cardInfo_content_title">SpieCraft V1</h2>
        <h3 className="cardInfo_content_subtitle">Présentation du projet</h3>
        <p className="cardInfo_content_text">SpieCraft est un site e-commerce
          de vente de poivre.
        </p>

        <h3 className="cardInfo_content_subtitle">Technologie du projet</h3>
        <ul>
          <li>Front-end</li>
          <ul>
            <li>Vuejs</li>
            <li>Typescript</li>
            <li>Bulma CSS</li>
          </ul>
          <li>Back-end</li>
          <ul>
            <li>Node.js</li>
            <li>Postrgre SQL</li>
          </ul>
        </ul>

        <h3 className="cardInfo_content_subtitle">Minimum Viable Product</h3>
        <h4 className="cardInfo_content_subsubtitle">Visiteur</h4>
        <ul className="cardInfo_content_list">
          <li>Visiteur</li>
          <ul className="cardInfo_content_list_list1_list1">
            <li>Voir les produits</li>
            <li>Pouvoir s'inscrire et se connecter</li>
          </ul>
          <li>Utilisateur connecté</li>
          <ul className="cardInfo_content_list_list2">
            <li>Ajouter des article au panier</li>
            <li>Voir et modifier son panier</li>
            <li>Gérer son profil</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default CardInfoSpieCraft;
