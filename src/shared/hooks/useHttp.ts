import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface UseHttpProps {
  showToast?: boolean;
  loading?: boolean;
}

interface ExecuteParams {
  asyncFunction: () => Promise<any>;
  onSuccess?: Function;
  onError?: Function;
  successMessage?: string;
  onFinally?: Function;
}

const useHttp = <T extends object>({ showToast = true, loading = false }: UseHttpProps) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T>();

  const execute = useCallback(
    ({
      asyncFunction,
      onSuccess,
      onError,
      successMessage,
      onFinally,
    }: ExecuteParams): Promise<boolean> => {
      setIsLoading(true);
      return asyncFunction()
        .then((response: any) => {
          if (successMessage && showToast) {
            toast.success(successMessage);
          }
          if (onSuccess) {
            onSuccess(response);
          }
          setData(response);
          setIsLoading(false);
          return true;
        })
        .catch(({ response }: AxiosError) => {
          setIsError(true);
          setIsLoading(false);
          setData(undefined);
          if (showToast) {
            toast.error("Ha ocurrido un error");
          }

          if (onError) {
            onError("Ha ocurrido un error");
          }
          return false;
        })
        .finally(() => {
          setIsLoading(false);

          if (onFinally) {
            onFinally();
          }
        });
    },
    [showToast],
  );

  return {
    isLoading, isError, execute, data,
  };
};

export default useHttp;
