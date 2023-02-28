import React from 'react'
import { Chat } from '.'

import { useAppSelector } from 'store/hooks'
import { selectRooms } from 'store/selectors'
import { selectCreatingRoomOpen } from 'store/slices/createRoom'

import { NewRoom } from 'components/createRoom'
import { SideMenuIcon } from 'components/sideMenu/icon'

import { Empty } from 'styles'
import { StyledChat } from './styles'

export const ChatWrapper = ({ matches }: { matches: boolean }) => {
  const { selected } = useAppSelector(selectRooms)
  const isCreatingRoomOpen = useAppSelector(selectCreatingRoomOpen)
  
  if (isCreatingRoomOpen) {
    return <NewRoom/>
  }

  if (!selected) {
    return (
      <StyledChat empty={true}>
        { !matches && <SideMenuIcon absolute={true} />}
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  return <Chat/>
}
