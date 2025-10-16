import './ProjectsList.scss';

interface ProjectsListUIProps {
  activeScene: number;
  focusIndex: number;
}

export default function ProjectsListUI({ activeScene, focusIndex }: ProjectsListUIProps) {
  const isActive = activeScene === 1;

  const projectTitle = [
    "SpieCraft",
    "GitHub Searcher",
    "Todolist",
    "CasaLink",
    "DTK Shop",
    "Ino Bank"
  ];

  const projectDescriptions = [
    "Site e-commerce de poivres responsive",
    "Recherche avancée GitHub via API",
    "Gestion de tâches simple et efficace",
    "Application de gestion d'emploi du temps familial",
    "Boutique tech sécurisée avec référencement optimisé",
    "Application mobile de banque en ligne moderne"
  ];

  return (
    <div className="projectsListUI">
      <span className={isActive ? "projectsListUI_title projectsListUI_title-active" : "projectsListUI_title"}>
        {projectTitle[focusIndex]}
      </span>
      <span className={isActive ? "projectsListUI_description projectsListUI_description-active" : "projectsListUI_description"}>
        {projectDescriptions[focusIndex]}
      </span>
    </div>

  );
}
