import { useMutation } from "@tanstack/react-query";
import { createReviewApi } from "../../../services/apiReviews";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateReview() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const { mutate: createReview, isPending, error } = useMutation({
    mutationFn: (review) => createReviewApi(review, token) ,
    onSuccess: () => {
        toast.success("Review created successfully")
      navigate("/dashboard/appointments")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create review") 
    },
  })
  return { createReview, isPending, error }
}
