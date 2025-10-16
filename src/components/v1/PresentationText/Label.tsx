import './PresentationText.scss';
import Anim from '../Anim/Anim';

interface LabelProps {
  children: React.ReactNode;
}

function Label({ children }: LabelProps) {
  return (
    <Anim className="animation1 skills_table_list_box a2" iv="iv2">
      <h3 className="skills_table_list_box_text">{children}</h3>
    </Anim>
  );
}

export default Label;
