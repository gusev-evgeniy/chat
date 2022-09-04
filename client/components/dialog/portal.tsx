import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactElement;
};

const Portal: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.getElementById('myportal') as HTMLElement);
};

export default Portal;
