export type GetTypingProps = {
  user: string;
  roomId: string;
  isTyping: boolean;
}

export type Callback = (...arg: any) => void;