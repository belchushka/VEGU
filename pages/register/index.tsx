import React from "react";
import { AuthLayout } from "@box/layouts";
import { RegisterForm } from "@box/features";
import { Button } from "@box/shared";
import Link from "next/link";
import Head from "next/head";

const Index = () => {
  return (
    <AuthLayout
      text={"Уже есть профиль?"}
      button={
          <Link href={"/login"}>
              <Button width={152} size={"sm"} preset={"dark"} >
                  Войти
              </Button>
          </Link>
      }
    >
        <Head>
            <title>Регистрация</title>
        </Head>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Index;
