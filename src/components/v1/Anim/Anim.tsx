import { useInView } from 'react-intersection-observer';
import './Anim.scss';
import { useState } from 'react';

interface AnimProps {
  className: string;
  iv?: string;
  children: React.ReactNode;
}

function Anim({ className, iv, children }: AnimProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  if (inView && !hasAnimated) {
    setHasAnimated(true);
  }

  return (
    <div className={hasAnimated ? `${className} ${iv}` : className} ref={ref}>
      {children}
    </div>
  );
}

export default Anim;
