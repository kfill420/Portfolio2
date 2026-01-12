import './Projects.scss';
import Card from './Card';
import Anim from '../Anim/Anim';
import { useAppSelector } from '../../../hooks/redux';
import CardInfoSpieCraft from '../CardInfo/CardInfoSpieCraft';
import CardInfoCasalink from '../CardInfo/CardInfoCasalink';
import CardInfoInobank from '../CardInfo/CardInfoInobank';

function Projects() {
  const cardInfoIsVisibleCasalink = useAppSelector((state) => state.cardInfo.Casalink)
  const cardInfoIsVisibleSpiecraft = useAppSelector((state) => state.cardInfo.Spiecraft)
  const cardInfoIsVisibleInobank = useAppSelector((state) => state.cardInfo.InoBank)

  return (
    <div className="projects">
      <Anim className="animation1" iv="iv1">
        <h2 className="projects_title">Mes projets</h2>
      </Anim>
      <Anim className="animation1" iv="iv1">
        <h3 className="projects_description">
          Un aperçu de mes applications web et mobiles
        </h3>
      </Anim>
      <div className="projects_list">
        <Card
          title="InoBank"
          description="React Native Typescript Postgres SQL"
          img="images/project6.webp"
          info={true}
          technos={["React", "Typescript", "Postgres SQL", "Node.js", "Redux", "Express", "Git", "Eslint", "Prettier"]}
        />
        <Card
          title="DTK"
          description="React Typescript Postgres SQL"
          img="images/project5.webp"
          url="https://dtk-shop.vercel.app/"
          bestProject={true}
          info={false}
          technos={["React", "Typescript", "Postgres SQL", "Node.js", "Redux", "Express", "Git", "Eslint", "Prettier", "Scrum"]}
        />
        <Card
          title="Casalink"
          description="React Typescript Postgres SQL"
          img="images/project4.webp"
          url="https://casalinkk.vercel.app/"
          info={true}
          technos={["React", "Typescript", "Postgres SQL", "Node.js", "Redux", "Express", "Git", "Eslint", "Prettier", "Scrum"]}
        />
        <Card
          title="Spiecraft"
          description="Vue.Js postgres SQL"
          img="images/project1.webp"
          url="https://spiecraft.vercel.app"
          info={true}
          technos={["Vue.js", "Typescript", "Postgres SQL", "Node.js", "Express", "Sequelize", "Bulma", "Git", "Eslint", "Prettier"]}
        />
        <Card
          title="ResidenceAlexandre"
          description="React Typescript"
          img="images/project7.webp"
          url="https://residence-alexandre.vercel.app"
          info={false}
        />
        <Card
          title="GithubSearcher"
          description="React API Github"
          img="images/project2.webp"
          url="https://kfill420.github.io/Github-Searcher/"
          info={false}
        />
        <Card
          title="Todolist"
          description="React API"
          img="images/project3.webp"
          url="https://kfill420.github.io/Todolist/"
          info={false}
        />
      </div>
      {cardInfoIsVisibleCasalink && <CardInfoCasalink />}
      {cardInfoIsVisibleSpiecraft && <CardInfoSpieCraft />}
      {cardInfoIsVisibleInobank && <CardInfoInobank />}
    </div>
  );
}

export default Projects;
