import React from 'react'
import { Chat } from '.'
import { useAppSelector } from '../../store/hooks'
import { selectRooms } from '../../store/selectors'
import { Empty } from '../../styles'
import { NewRoom } from '../createRoom'
import { StyledChat } from './styled'

export const ChatWrapper = () => {
  const { newChat, selected } = useAppSelector(selectRooms)

  if (newChat) {
    return <NewRoom/>
  }

  if (!selected) {
    return (
      <StyledChat empty={true}>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  return <Chat/>
}
