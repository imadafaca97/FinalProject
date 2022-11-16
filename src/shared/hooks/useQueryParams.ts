import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryParams = {
  [k: string]: string;
};

type SetQueryParamsOptions = {
  removeOldQueryParams: boolean;
};

const useQueryParams = () => {
  const [search, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => Object.fromEntries([...search]) as QueryParams, [search]);

  /**
 * It takes a queryParamsValue object and an options object, and returns a function that updates the query params.
 *
 * @param {QueryParams} queryParamsValue - QueryParams - The new query params to set.
 * @param {SetQueryParamsOptions} options - SetQueryParamsOptions - The options to set.
 * @example
 * // If you want the previous query params to be kept
 * const { setQueryParams } = useQueryParams();
 * setQueryParams({
 *  page: '1',
 * })
 *
 * // If you DONT'T want the previous  query params to be kept
 * const { setQueryParams } = useQueryParams();
 * setQueryParams({
 *  page: '1',
 * }, { removeOldQueryParams: true })
 */

  const setQueryParams = (
    queryParamsValue: QueryParams,
    options: SetQueryParamsOptions = {
      removeOldQueryParams: false,
    },
  ) => {
    if (options.removeOldQueryParams) {
      return setSearchParams(queryParamsValue);
    }

    return setSearchParams({ ...queryParams, ...queryParamsValue });
  };

  return {
    queryParams,
    setQueryParams,
    search,
  };
};
export default useQueryParams;
