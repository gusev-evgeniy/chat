import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import { convertSecondsToMinutesAndSeconds as convert } from '@/utils/message';

import { useStopWatch } from '@/hooks/useStopWatch';

import send from '@/images/send.svg';
import close from '@/images/close.svg';

import { PulsarDot } from '@/styles/pulsar';
import {
  MicIcon,
  StopRecordIcon,
  StyledMessageFooter,
  StyledMessageForm,
} from '../styles';

type Props = {
  submit: () => void;
  cancel: () => void;
}

export const RecordForm: FC<Props> = ({ submit, cancel }) => {
  const { time, start, reset } = useStopWatch();

  useEffect(() => {
    start();

    return () => reset();
  }, [])

  return (
    <StyledMessageForm onClick={e => e.preventDefault()}>
      <StyledMessageFooter>
        <div className='info'>
          <PulsarDot rgb='102,255,153' />
          <div className='time'>{convert(time)}</div>
        </div>
        <div className='text'>Recording...</div>

        <StopRecordIcon onClick={cancel}>
          <Image width='20px' height='20px' src={close} alt='stop' />
        </StopRecordIcon>

        <MicIcon onClick={submit}>
          <Image width='30px' height='30px' src={send} alt='send' />
        </MicIcon>
      </StyledMessageFooter>
    </StyledMessageForm>
  );
};
