import {useDispatch} from "react-redux";
import {AppDispatch} from "@box/store";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
