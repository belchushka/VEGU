import React, { useEffect } from "react";
import { IWithChildren } from "@types";
import { useRouter } from "next/router";
import {useAuth, useLoading} from "@box/shared/hooks";
import {IAuthGuard} from "./types";


const AuthGuard: React.FC<IAuthGuard> = ({ permissions,children }) => {
  const isAuth = useAuth()
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
