import Anim from '../Anim/Anim';
import './Skills.scss';

function Skills() {
  return (
    <div className="skills">
      <div className="skills_container reveal-5">
        <Anim className="animation1" iv="iv1">
          <h2 className="skills_container_title">
            Enchanté, je m&apos;appelle Alexis
          </h2>
        </Anim>

        <Anim className="animation1" iv="iv1">
          <p className="skills_container_text">
            Un développeur web fullstack spécialisé en Node.js et React.
          </p>
        </Anim>

        <Anim className="animation1" iv="iv1">
          <p className="skills_container_text">
            Passionné par la résolution de problèmes et l&apos;innovation, je
            collabore avec des équipes pour créer des solutions numériques
            robustes et conviviales.
          </p>
        </Anim>

        <Anim className="animation1" iv="iv1">
          <p className="skills_container_text">
            Mon objectif est de transformer les idées en réalité en utilisant
            les technologies les plus récentes et les meilleures pratiques de
            l&apos;industrie.
          </p>
        </Anim>
      </div>
    </div>
  );
}

export default Skills;
