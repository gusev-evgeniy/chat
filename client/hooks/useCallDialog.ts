import { useEffect } from "react";
import { useCall } from "../components/providers/callProvider";
import { useAppDispatch } from "../store/hooks"
import { openDialog } from "../store/slices/dialog";

//TODO это костыль. Убрать

export const useCallDialog = () => {
  const dispatch = useAppDispatch();

  const { callAccepted } = useCall();
  console.log('callAccepted', callAccepted)
  useEffect(() => {
    dispatch(openDialog('CALL'));
  }, [callAccepted])
}