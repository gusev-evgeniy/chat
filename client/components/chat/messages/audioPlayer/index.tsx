import { MessageIcon, StyledAttachment } from 'components/chat/styles';
import Image from 'next/image';
import React, { FC } from 'react';

import { Message } from 'types/messages';
import { Bar } from './bar';
import useAudioPlayer from './useAudioPlayer';

import playIcon from 'images/play.svg';
import stopIcon from 'images/stop.svg';
import { convertSecondsToMinutesAndSeconds as convert } from 'utils/message';

type Props = Pick<Message, 'media'>;

export const Audio: FC<Props> = ({ media }) => {
  const { curTime, playing, setClickedTime, audioRef, start, stop, rewind } =
    useAudioPlayer();

  if (!media) {
    return null;
  }

  const duration = audioRef.current?.duration || 0;
  const mathDuration = Math.trunc(duration);

  return (
    <StyledAttachment>
      <audio
        hidden
        autoPlay={false}
        controls={true}
        src={media}
        ref={audioRef}
      />

      <>
        <MessageIcon onClick={playing ? stop : start}>
          <Image
            width='18px'
            height='18px'
            src={playing ? stopIcon : playIcon}
            alt='player'
          />
        </MessageIcon>

        <div className='file_info'>
          <Bar
            duration={duration}
            curTime={curTime}
            onTimeUpdate={rewind}
          />
          <div className='size'>{`${convert(curTime)} / ${convert(
            mathDuration
          )}`}</div>
        </div>
      </>
    </StyledAttachment>
  );
};
