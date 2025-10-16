import { useState } from 'react';
import { GitHub, Linkedin, Mail, Phone } from 'react-feather';
import './Networks.scss';
import Anim from '../Anim/Anim';

function Networks({ scrollToTarget }: { scrollToTarget: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Utilisez un seul état pour le survol

  const items = [
    {
      id: 1,
      href: "tel:0678309108",
      icon: <Phone />,
      content: "+33 6 78 30 91 08",
      name: "téléphone"
    },
    {
      id: 2,
      icon: <Mail />,
      scroll: true,
      name: "email"
    },
    {
      id: 3,
      href: "https://www.linkedin.com/in/alexis-vignot/",
      icon: <Linkedin />,
      name: "linkedin"
    },
    {
      id: 4,
      href: "https://github.com/kfill420",
      icon: <GitHub />,
      name: "github"
    },
  ];

  return (
    <div className="networks">
      {items.map((item, index) => (
        <Anim key={item.id} className={`a3t${index + 1} networks_container ${hoveredIndex === index ? 'networks_container-expended' : ''}`} iv="iv3">
          {item.name !== "email" ?
            <a
              href={item.href}
              className={`networks_item ${hoveredIndex === index ? 'networks_item-expended' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              {...item.scroll && { onClick: scrollToTarget }}
              aria-label={`Lien vers mon ${item.name}`}
            >
              <div className='networks_item_logo'>
                {item.icon}
              </div>
              {item.content && (
                <div className={`networks_item_content ${hoveredIndex === index ? 'networks_item_content-expended' : ''}`}>
                  <span>{item.content}</span>
                </div>
              )}
            </a>
            :
            <button
              className={`networks_item ${hoveredIndex === index ? 'networks_item-expended' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              {...item.scroll && { onClick: scrollToTarget }}
              aria-label={`Lien vers mon ${item.name}`}
            >
              <div className='networks_item_logo'>
                {item.icon}
              </div>
              {item.content && (
                <div className={`networks_item_content ${hoveredIndex === index ? 'networks_item_content-expended' : ''}`}>
                  <span>{item.content}</span>
                </div>
              )}
            </button>

          }
        </Anim>
      ))}
    </div>
  );
}

export default Networks;
