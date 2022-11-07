import { AppThunk } from "@box/store";
import { $autHost } from "@box/shared";

export const requestCourse: AppThunk = (id: number) => async () => {
  try {
    await $autHost.post("/course/buy", {
      id: id,
    });
  } catch (e) {}
};
