/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosWithoutAuthInstance from '../api/without.auth';

interface IFetchData {
  url: string;
  key: string;
  optionalKey?: unknown;
  auth?: boolean;
  dependency?: unknown;
  dependencyValue?: unknown;
}

interface IMutation {
  url: string;
  key?: string;
  optionalKey?: unknown;
  auth?: boolean;
  successType?: string;
  errorType?: string;
  navigateOnSuccess?: any;
  navigateOnError?: any;
  resetForm?: any;
  storeInRedux?: {
    function: any;
    metaData?: any;
  };
  method?: any;
  headers?: any;
}

export const FetchData = ({
  url,
  key,
  optionalKey,
  dependency,
  dependencyValue,
}: IFetchData) => {
  return useQuery(
    [key, optionalKey ? optionalKey : ''],
    async () => {
      const { data } = await AxiosWithoutAuthInstance.get(`${url}`);
      return data;
    },

    {
      enabled: dependency ? !!dependencyValue : true,
    }
  );
};

export const useFetchData = ({
  url,
  key,
  optionalKey,
  dependency,
  dependencyValue,
}: IFetchData) => {
  return useQuery(
    [key, optionalKey || ''],
    async () => {
      const { data } = await AxiosWithoutAuthInstance.get(`${url}`);
      return data;
    },
    {
      enabled: dependency ? !!dependencyValue : true,
    }
  );
};

export const PostData = ({
  url,
  key,
  optionalKey,
  // auth,
  successType,
  errorType,
  navigateOnSuccess,
  navigateOnError,
  resetForm,
}: // storeInRedux,
IMutation) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    async (formData: any) => {
      const response = await AxiosWithoutAuthInstance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries([key, optionalKey || '']);
        if (resetForm) {
          resetForm();
        }
        if (successType) {
          toast.success(data?.message);
        }
        if (navigateOnSuccess) {
          nav(navigateOnSuccess);
        }
      },
      onError: (error: any) => {
        if (errorType) {
          toast.error(
            error?.response?.data?.error ||
              error?.response?.data?.message ||
              'Something went wrong'
          );
        }
        if (navigateOnError) {
          nav(navigateOnError);
        }
      },
    }
  );
};

export const DeleteData = ({
  url,
  key,
  optionalKey,
  successType,
  errorType,
  navigateOnSuccess,
  navigateOnError,
}: IMutation) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id }: any) => {
      const response = await await AxiosWithoutAuthInstance.delete(
        `${url}/${id}`
      );
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries([key, optionalKey || '']);
        if (successType) {
          toast.success(data?.message);
        }
        if (navigateOnSuccess) {
          nav(navigateOnSuccess);
        }
      },
      onError: (error: any) => {
        if (errorType) {
          toast.error(
            error?.response?.data?.error ||
              error?.response?.data?.message ||
              'Something went wrong'
          );
        }
        if (navigateOnError) {
          nav(navigateOnError);
        }
      },
    }
  );
};
