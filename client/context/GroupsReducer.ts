import { useReducer } from "react"

const INITIAL_STATE = [] as any

const groupsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        [action.payload.code]: {
          name: action.payload.name,
          img: action.payload.img,
        },
      }

    case "REMOVE":
      return {
        ...state,
        [action.payload.code]: "",
      }
    case "REMOVE_ALL":
      return (state = [])

    default:
      return state
  }
}

export const useGroups = () => {
  const [state, dispatch] = useReducer(groupsReducer, INITIAL_STATE)
  return { state, dispatch }
}
