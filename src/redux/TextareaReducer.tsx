import React, { createContext, Reducer, useReducer } from 'react'

type AppState = typeof initialState;


type initialState = {
    text: string | null
    count: number
    words: string[] | ""
}

type TextareaProviderProps = {
    children: React.ReactNode
}

type Action = { type: "SET_TEXTAREA", payload: string } |  { type: "RESET_TEXTAREA" }

const initialState: initialState = {
    text: "",
    count: 0,
    words: ""
}


const TextareaReducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case "SET_TEXTAREA":
            var wordsToDispatch: number = action.payload.split(" ").length;
            if (action.payload === "") {
                wordsToDispatch = 0
            }
            return {
                text: action.payload,
                count: action.payload.length,
                words: wordsToDispatch
            }
        case "RESET_TEXTAREA":
            return { 
                text: "",
                count: 0,
                words: ""
            }
    }
}

export const TextareaContext = createContext<{state: initialState, dispatch: React.Dispatch<Action>}>({state: initialState, dispatch: () => {}})


export const TextareaProvider = ({children}: TextareaProviderProps) => {
    const [state, dispatch] = useReducer(TextareaReducer as React.Reducer<initialState, Action>, initialState);

    return (
        <TextareaContext.Provider value={{state, dispatch}}>
            {children}
        </TextareaContext.Provider>
    )
}