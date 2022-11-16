import React from 'react';
import { ClientManager, UserManager } from '../../shared/manager';
import { ClientRepository, UserRepository } from '../../shared/repository';

export interface AppManager {
  clientManager: ClientManager;
  userManager: UserManager;
}

const defaultState: AppManager = {
  clientManager: ClientManager.build(new ClientRepository()),
  userManager: UserManager.build(new UserRepository())
};

export const AppManagerContext = React.createContext<AppManager>(defaultState);

/**
 * Higher order component to provide application data managers.
 * @param {React.ReactNode} children - Components that will have access to data managers
 * @returns {React.FC} higher order component that will provide application data dependencies
 * @example
 * import { useContext } from 'React';
 * import { CitizenRepository } from '../../shared/repositories/CitizenRepository';
 * import { ExpedientRepository } from '../../shared/repositories/ExpedientRepository';
 * import { AuthorizedRequestRepository } from '../../shared/repositories/AuthorizedRequestRepository';
 *
 * const { userManager } = useContext(AppManagerContext);
 *
 * const userNames = userManager.getUserNames();
 *
 */
export const AppManagerProvider: React.FC = () => {
  const val = React.useMemo(() => defaultState, []);
  return <AppManagerContext.Provider value={val}>{}</AppManagerContext.Provider>;
};
