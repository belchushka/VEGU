import React from "react";
export const ModeContext = React.createContext<{mode: "redactor" | "view"}>({
    mode:"view"
})
