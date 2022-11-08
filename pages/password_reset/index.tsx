import React from "react";
import { AuthLayout } from "@box/layouts";
import { Button } from "@box/shared";
import { PasswordResetForm } from "@box/features";
import Link from "next/link";

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
          <PasswordResetForm />
      </AuthLayout>
  );
};

export default Index;
