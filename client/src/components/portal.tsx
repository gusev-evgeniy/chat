import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PortalTypes } from '@/types';

type Props = {
  children: React.ReactElement;
  type: PortalTypes
};

const Portal: FC<Props> = ({ children, type }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.getElementById(type) as HTMLElement);
};

export default Portal;
