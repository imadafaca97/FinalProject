import React from 'react';
import { ModalState } from '../providers/ModalProvider';

export enum ModalReducerActionType {
   openModal = 'openModal',
   closeModal = 'closeModal'
}

export type ModalAction =
  {
    type: ModalReducerActionType;
    payload?: {
      content: React.ReactNode;
      footer?: React.ReactNode | null;
      wrapClassName?: string;
      closable: boolean;
      title?: string;
      width?: number;
    };
}

export const ModalReducer = (
  {
    wrapClassName, closable, content, visible, footer, title,
  }: ModalState,
  { type, payload }: ModalAction,
): ModalState => {
  switch (type) {
    case 'openModal':
      return {
        ...payload,
        visible: true,
        content: payload!.content,
        footer: payload?.footer || null,
        wrapClassName: payload?.wrapClassName,
        closable: payload!.closable,
        title: payload?.title,
        width: payload?.width,
      };

    case 'closeModal':
      return {
        visible: false,
        content: undefined,
        footer: undefined,
        wrapClassName,
        closable: false,
      };

    default:
      return {
        visible,
        content,
        footer,
        wrapClassName,
        closable,
        title,
      };
  }
};
