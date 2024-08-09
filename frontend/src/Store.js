import { createContext } from "react";
export const Context = createContext();
export default function Store({children}){
    return(
        <Context.Provider 
        value={{name : "me"}}
        >
        {children}
        </Context.Provider>
    )
}