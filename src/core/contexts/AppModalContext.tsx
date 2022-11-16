import { ModalContextProps } from '../providers/ModalProvider';
import { createContext } from 'react';

export const AppModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export default AppModalContext;
