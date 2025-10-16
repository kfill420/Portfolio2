import './PresentationText.scss';
import logo_front from '/images/logo_front.webp';
import logo_back from '/images/logo_back.webp';
import logo_gestion from '/images/logo_gestion.webp';
import Anim from '../Anim/Anim';
import Label from './Label';

function PresentationText() {
  return (
    <div className="skills_container2">
      <div className="skills_table">
        <div className="skills_table_frontend">
          <Anim className="animation1" iv="iv1">
            <img
              className="skills_table_logo"
              src={logo_front}
              alt="front end part"
            />
          </Anim>

          <Anim className="animation1" iv="iv1">
            <h3 className="skills_table_title">Frontend</h3>
          </Anim>

          <div className="skills_table_list">
            <Label>HTML</Label>
            <Label>SCSS</Label>
            <Label>Bulma</Label>
            <Label>Semantic UI</Label>
            <Label>Javascript</Label>
            <Label>Vue.Js</Label>
            <Label>React</Label>
            <Label>Typscript</Label>
            <Label>Redux</Label>
            <Label>Vite</Label>
            <Label>Figma</Label>

          </div>
        </div>
        <div className="skills_table_backend">
          <Anim className="animation1" iv="iv1">
            <img
              className="skills_table_logo"
              src={logo_back}
              alt="back end part"
            />
          </Anim>

          <Anim className="animation1" iv="iv1">
            <h3 className="skills_table_title">Backend</h3>
          </Anim>

          <div className="skills_table_list">
            <Label>Node.Js</Label>
            <Label>Express</Label>
            <Label>Ejs</Label>
            <Label>Postgres SQL</Label>
            <Label>MongoDB</Label>
            <Label>Sequelize</Label>
            <Label>Strapi</Label>
            <Label>API Rest</Label>
            <Label>Web Socket</Label>
            <Label>Thunder Client / Postman</Label>
          </div>
        </div>
        <div className="skills_table_gestion">
          <Anim className="animation1" iv="iv1">
            <img
              className="skills_table_logo"
              src={logo_gestion}
              alt="gestion end part"
            />
          </Anim>

          <Anim className="animation1" iv="iv1">
            <h3 className="skills_table_title">Projet</h3>
          </Anim>

          <div className="skills_table_list">
            <Label>Docker</Label>
            <Label>Render</Label>
            <Label>Vercel</Label>
            <Label>Git</Label>
            <Label>Eslint / Prettier</Label>
            <Label>Notion</Label>
            <Label>Slack / Teams / Discord</Label>
            <Label>Jira</Label>
            <Label>Méthode Agile (SCRUM)</Label>
            <Label>Méthodologie Merise</Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationText;
