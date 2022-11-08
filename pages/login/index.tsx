import React from "react";
import { AuthLayout } from "@box/layouts";
import { LoginForm } from "@box/features";
import { Button } from "@box/shared";
import Link from "next/link";
import Head from "next/head";

const Index = () => {
  return (
    <AuthLayout
      text={"Eще нет профиля"}
      button={
        <Link href={"/register"}>
            <Button size={"sm"} preset={"dark"} >
                Зарегистрироваться
            </Button>
        </Link>
      }
    >
        <Head>
            <title>Вход</title>
        </Head>
      <LoginForm />
    </AuthLayout>
  );
};

export default Index;
