import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { actionCardInfoVisible } from '../../../store/reducer/cardInfo';
import './CardInfoCasalink.scss';

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
    dispatch(actionCardInfoVisible({ projet: "Casalink" }));
  }

  return (
    <div className="cardInfo">
      <div className={isVisible ? "cardInfo_background cardInfo_background-isVisible" : "cardInfo_background"} onClick={handleQuit} />
      <div className={isVisible ? "cardInfo_content cardInfo_content-isVisible" : "cardInfo_content"}>
        <h2 className="cardInfo_content_title">Casalink V1</h2>
        <h3 className="cardInfo_content_subtitle">Présentation du projet</h3>
        <p className="cardInfo_content_text">CasaLink est une application web conçue
          pour simplifier la gestion des emplois du temps, des tâches
          domestiques et des événements au sein d'un foyer. Elle vise à
          améliorer la coordination et la communication entre les membres d'un
          même foyer en offrant une plateforme centralisée pour organiser et
          partager des informations importantes.</p>
        <video controls>
          <source src="Casalink.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        <h3 className="cardInfo_content_subtitle">Technologie du projet</h3>
        <ul>
          <li>Front-end</li>
          <ul>
            <li>React</li>
            <li>Typescript</li>
            <li>Scss</li>
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
          <ul className="cardInfo_content_list_list1">
            <li>Accès à la landing page</li>
            <ul className="cardInfo_content_list_list1_list1">
              <li>Présnetaiton de l'application</li>
              <li>Agenda type</li>
              <li>Pouvoir s'inscrire et se connecter</li>
            </ul>
          </ul>
          <li>Utilisateur connecté</li>
          <ul className="cardInfo_content_list_list2">
            <li>Parent</li>
            <ul className="cardInfo_content_list_list2_list1">
              <li>Pouvoir créer, modifier et supprimer un tâche</li>
              <li>Pouvoir créer, modifier et supprimer un profil</li>
              <li>Dispose d'un code PIN</li>
              <li>Gérer les restrictions</li>
            </ul>
            <li>Enfant</li>
            <ul className="cardInfo_content_list_list2_list2">
              <li>Selection de son profil</li>
              <li>Voir les tâches</li>
            </ul>
          </ul>
        </ul>
        <a href="CDC.pdf" download>Télécharger le Cahier des Charges complet</a>
      </div>
    </div>
  );
}

export default CardInfoCasalink;
