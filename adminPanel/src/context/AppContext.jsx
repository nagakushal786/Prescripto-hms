import { createContext } from "react";

export const AppContext=createContext();

const AppContextProvider=(props)=> {
    const calculateAge=(dob)=> {
        const today=new Date();
        const birthdate=new Date(dob);

        const age=today.getFullYear()-birthdate.getFullYear();
        return age;
    }

    const formattedDate=(slotDate)=> {
        const months=["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const dateArray=slotDate.split("-");
        return `${dateArray[0]} ${months[Number(dateArray[1])]}, ${dateArray[2]}`;
    }

    const currencySymbol="₹";

    const value={
        calculateAge,
        formattedDate,
        currencySymbol
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;