import {$autHost} from "@box/shared";

export async function updatePositionApi(
    endpoint: string,
    id: string,
    position?: number
) {
    try {
        if (typeof position !== "undefined") {
            await $autHost.put(endpoint, {
                id: id,
                position: position,
            });
        }
    } catch (e) {}
}
