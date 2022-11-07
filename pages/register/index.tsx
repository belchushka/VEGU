import React from "react";
import { AuthLayout } from "@box/layouts";
import { RegisterForm } from "@box/features";
import { Button } from "@box/shared";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <AuthLayout
      text={"Уже есть профиль?"}
      button={
        <Button width={132} onClick={() => router.push("/login")} type={"grey"}>
          <span>Войти</span>
        </Button>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Index;
