import { useCallback, useState } from "react";

type useLoadingType = {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export function useLoading(initial = false): useLoadingType {
  const [loading, setLoading] = useState<boolean>(initial);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    startLoading,
    stopLoading,
  };
}
