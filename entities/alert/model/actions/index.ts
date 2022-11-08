import {AppThunk, store} from "@box/store";
import { hideAlert, showAlert } from "@box/entities";

const alertMessage: AppThunk =
  (type: "success" | "error", text: string) => (dispatch) => {
    dispatch(hideAlert({}));
    dispatch(
      showAlert({
        type,
        text,
      })
    );
    setTimeout(() => {
      dispatch(hideAlert({}));
    }, 2000);
  };

export const appAlert = (type: "success" | "error", message: string)=> store.dispatch(alertMessage(type, message))
