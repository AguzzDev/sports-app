import { useQuery } from "@apollo/client"
import { GET_RANDOM_PLAYER } from "../querys"

export const useRandomPlayer = () => {
  const result = useQuery(GET_RANDOM_PLAYER)
  return result
}