import { AppModalContext } from '../../core/contexts';
import { useContext } from 'react';

export const useAppModal = () => {
  const { openModal, closeModal } = useContext(AppModalContext);

  return {
    openModal, closeModal,
  };
};
