import { changeDraft } from 'store/slices/draft';
import { AppDispatch, RootState } from '..';

export const updateDraft =
  (text: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();
    if (!selected) {
      return;
    }

    dispatch(changeDraft({ key: selected, text }));
  };

export const addEmoji =
  (emoji: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
      draft: { data },
    } = getState();
    if (!selected) {
      return;
    }

    const prevText = data[selected] || '';

    dispatch(changeDraft({ key: selected, text: prevText + emoji }));
  };
