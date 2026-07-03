import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import toast from "react-hot-toast";

const ReviewPopup = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("supabaseToken");

  const [isVisible, setIsVisible] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["pending-reviews"],
    queryFn: async () => {
      const res = await api.get("/api/reviews/pending");
      return res.data.products;
    },
    enabled: !!token,
  });

  const submitMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await api.post("/api/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted! Thank you.");
      queryClient.invalidateQueries({ queryKey: ["pending-reviews"] });
      setRating(0);
      setComment("");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit review");
    },
  });

  const products = data || [];
  if (isLoading || products.length === 0 || !isVisible) return null;

  const product = products[0]; // Show one review prompt at a time

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    submitMutation.mutate({
      productId: product.id,
      rating,
      comment,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-surface rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <div className="p-6">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl text-primary mb-2">
              Rate Your Experience
            </h2>
            <p className="font-sans text-sm text-on-surface-variant">
              We noticed your order for <strong>{product.title}</strong> has
              been delivered. How do you like it?
            </p>
          </div>

          {product.image && (
            <div className="flex justify-center mb-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <span
                    className="material-symbols-outlined text-[36px] transition-colors"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                      color:
                        (hoverRating || rating) >= star ? "#FCD34D" : "#E5E7EB", // amber-300 / gray-200
                    }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a brief review (optional)..."
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary/50 mb-6 min-h-25 resize-y"
            ></textarea>

            <div className="flex w-full gap-4">
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="flex-1 py-3 px-4 font-sans text-sm font-semibold text-on-surface-variant border border-outline-variant/50 rounded hover:bg-surface-container-low transition-colors"
              >
                Skip
              </button>
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="flex-1 py-3 px-4 font-sans text-sm font-bold bg-primary text-on-primary rounded hover:bg-primary-container transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
