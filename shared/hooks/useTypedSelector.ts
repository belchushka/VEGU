import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppState} from "@box/store";

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
