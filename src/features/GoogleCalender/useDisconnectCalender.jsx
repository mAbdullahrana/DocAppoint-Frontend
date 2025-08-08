import { useDispatch, useSelector } from "react-redux"
import { disconnectCalenderApi } from "../../services/apiCalender"
import { setCalendarSyncEnabled } from "../authentication/authSlice"
import { useSearchParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"


export function useDisconnectCalender() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const [searchParams, setSearchParams] = useSearchParams()

  const { mutate: disconnectCalender, isPending } = useMutation({
    mutationFn: () => disconnectCalenderApi(token),
    onSuccess: (data) => {
      dispatch(setCalendarSyncEnabled(false))
      setSearchParams({})
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { disconnectCalender, isPending }
}