import React, { FC, useEffect, useState } from 'react';
import { StyledSubstring } from '../styles';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type Props = {
  time: string | undefined;
};

export const PrivateSubstring: FC<Props> = ({ time }) => {
  const [relativeTime, setRelativeTime] = useState(dayjs().to(dayjs(time)));
  useEffect(() => {
    setInterval(() => {
      setRelativeTime(dayjs().to(dayjs(time)));
    }, 60000);
  }, [time]);

  return <StyledSubstring>{relativeTime}</StyledSubstring>;
};
