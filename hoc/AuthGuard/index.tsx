import React, { useEffect } from "react";
import { IWithChildren } from "@types";
import { useRouter } from "next/router";
import { useTypedSelector } from "@box/store/hooks";
import { useLoading } from "@box/shared/hooks";

interface IWithAuth extends IWithChildren {}

const AuthGuard: React.FC<IWithAuth> = ({ children }) => {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  const { loading, stopLoading, startLoading } = useLoading();
  const router = useRouter();
  useEffect(() => {
    startLoading();
    if (!isAuth) {
      router.replace(
        "/auth",
        {
          query: {
            to: router.asPath,
          },
        },
        {}
      );
    } else {
      stopLoading();
    }
  }, []);
  return <>{!loading && children}</>;
};

export { AuthGuard };
