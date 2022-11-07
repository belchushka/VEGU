import React from "react";
import { AuthLayout } from "@box/layouts";
import { Button } from "@box/shared";
import { useRouter } from "next/router";
import { PasswordResetForm } from "@box/features/auth_form/ui/password_reset";

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
      <PasswordResetForm />
    </AuthLayout>
  );
};

export default Index;
