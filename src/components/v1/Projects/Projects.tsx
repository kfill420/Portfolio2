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
          title="CoreHunter"
          description="Jeu Web Javascript WebSocket"
          img="images/project9.webp"
          url="https://corehunter.vercel.app"
          bestProject={true}
          info={false}
          technos={["Javascript", "Phaser", "WebSocket", "Node.js"]}
        />
        <Card
          title="DTK"
          description="React TypeScript PostgreSQL"
          img="images/project5.webp"
          url="https://dtk-shop.vercel.app/"
          bestProject={true}
          info={false}
          technos={["React", "TypeScript", "PostgreSQL", "Node.js", "Redux", "Express", "Git", "EsLint", "Prettier", "Scrum"]}
          // github="https://github.com/kfill420/DTK"
        />
        <Card
          title="DevEngineStudio"
          description="WordPress SEO Ubuntu Mariadb"
          img="images/project8.webp"
          url="https://devengine-studio.fr"
          bestProject={false}
          info={false}
          technos={["WordPress", "SEO", "Mariadb", "Ubuntu"]}
        />
        <Card
          title="InoBank"
          description="React Native TypeScript PostgreSQL"
          img="images/project6.webp"
          info={true}
          technos={["React", "TypeScript", "PostgreSQL", "Node.js", "Redux", "Express", "Git", "EsLint", "Prettier"]}
        />
        <Card
          title="Casalink"
          description="React TypeScript PostgreSQL"
          img="images/project4.webp"
          url="https://casalinkk.vercel.app/"
          info={true}
          technos={["React", "TypeScript", "PostgreSQL", "Node.js", "Redux", "Express", "Git", "EsLint", "Prettier", "Scrum"]}
        />
        <Card
          title="Spiecraft"
          description="Vue PostgreSQL"
          img="images/project1.webp"
          url="https://spiecraft.vercel.app"
          info={true}
          technos={["Vue", "TypeScript", "PostgreSQL", "Node.js", "Express", "Sequelize", "Bulma", "Git", "EsLint", "Prettier"]}
        />
        <Card
          title="ResidenceAlexandre"
          description="React TypeScript"
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
