import React from "react";
import { AuthLayout } from "@box/layouts";
import { LoginForm } from "@box/features";
import { Button } from "@box/shared";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <AuthLayout
      text={"Eще нет профиля"}
      button={
        <Button onClick={() => router.push("/register")} type={"grey"}>
          <span>Зарегистрироваться</span>
        </Button>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Index;
