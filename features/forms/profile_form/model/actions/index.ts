import {AppThunk} from "@box/store";
import {$autHost} from "@box/shared";
import {setAuthUser} from "@box/entities";

export const updateAvatar: AppThunk = (avatar: File) => async (dispatch) => {
    try {
        const { data: user_data } = await $autHost.put(
            "/user/update-avatar",
            {
                avatar: avatar,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(setAuthUser(user_data.body));
    } catch (e) {
        throw e;
    }
};

export const updateInfo: AppThunk = (data: {
    name: string;
    surname: string;
    patronymic: string;
}) => async (dispatch) => {
    try {
        const { data: user_data } = await $autHost.put("/user/update", data);
        dispatch(setAuthUser(user_data.body));
    } catch (e) {
        throw e;
    }
}
