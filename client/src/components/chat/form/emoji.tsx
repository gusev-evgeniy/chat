import React, { FC } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { EmojiWrapper } from '../styles';

type Props = {
  pickEmoji: (e: any) => void;
};

export const Emoji: FC<Props> = ({ pickEmoji }) => {
  return (
    <EmojiWrapper>
      <Picker
        data={data}
        onEmojiSelect={pickEmoji}
        previewPosition='none'
        searchPosition='none'
        theme='light'
      />
    </EmojiWrapper>
  );
};
