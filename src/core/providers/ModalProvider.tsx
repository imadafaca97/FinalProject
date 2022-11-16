import React, { useCallback, useReducer } from 'react';
import { AppModalContext } from '../contexts/AppModalContext';
import { ModalReducer, ModalReducerActionType } from '../Reducers/ModalReducer';
import { ModalProps } from 'antd/lib/modal';

export interface ModalState extends ModalProps {
  visible: boolean;
  content: React.ReactNode | undefined;
  footer?: React.ReactNode | null;
  wrapClassName?: string;
  closable: boolean;
  title?: string;
  width?: number;
}

export interface ModalProperties {
  content: React.ReactNode;
  footer?: React.ReactNode | null;
  wrapClassName?: string;
  closable: boolean;
  title?: string;
  width?: number;
  destroyOnClose?: boolean,
}

export interface ModalContextProps {
  state: ModalState;
  openModal: (props: ModalProperties) => void;
  closeModal: () => void;
}

const initialState: ModalState = {
  visible: false,
  content: undefined,
  closable: false,
  footer: null,
};

interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
  context?: React.Context<ModalContextProps>;
}

export const ModalProvider = ({ children, context: Context = AppModalContext }: Props) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const openModal = useCallback((props: ModalProperties) => {
    dispatch({
      type: ModalReducerActionType.openModal,
      payload: props,
    });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: ModalReducerActionType.closeModal, payload: undefined });
  }, []);

  const val = React.useMemo(
    () => ({
      state,
      openModal,
      closeModal,
    }),
    [closeModal, openModal, state],
  );

  return <Context.Provider value={val}>{children}</Context.Provider>;
};

ModalProvider.defaultProps = {
  context: AppModalContext,
};
