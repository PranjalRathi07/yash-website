/** @format */

// Checkout.jsx
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const [localUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await api.get("/api/auth/me");
      if (res.data?.user) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      }
      return res.data.user;
    },
    initialData: localUser,
  });

  // Fetch Addresses
  const { data: addresses = [] } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await api.get("/api/addresses");
      return res.data?.addresses || [];
    },
  });

  const primaryAddress =
    addresses.find((addr) => addr.isDefault) || addresses[0];

  // Fetch Cart
  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get("/api/cart");
      return res.data?.cart || { items: [] };
    },
  });

  const cartItems = cartData?.items || [];
  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.variant?.price || item.product?.price || 0);
    return acc + price * item.quantity;
  }, 0);

  const discount = 0; // Future enhancement
  const gst = subtotal * 0.05; // 5% GST
  const total = subtotal + gst - discount;

  const handleCheckout = async () => {
    if (!primaryAddress) {
      toast.error("Please add a shipping address before completing the purchase.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsProcessing(true);

    try {
      const apiPaymentMethod = selectedPayment === "cod" ? "COD" : "RAZORPAY";

      const checkoutRes = await api.post("/api/checkout", {
        addressId: primaryAddress.id,
        couponCode: null,
        paymentMethod: apiPaymentMethod,
      });

      if (apiPaymentMethod === "COD") {
        // COD Success
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("Order placed successfully via Cash on Delivery!");
        navigate("/profile/my-orders");
        return;
      }

      // Razorpay Flow
      const razorpayOrder = checkoutRes.data.razorpayOrder;

      const isScriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load. Are you offline?");
        setIsProcessing(false);
        return;
      }

      // Fetch Razorpay Key
      const keyRes = await api.get("/api/payments/razorpay/key");
      const razorpayKey = keyRes.data.key;

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Krishna Vasanam",
        description: "Sacred Items Purchase",
        order_id: razorpayOrder.id,
        checkout_config_id: "config_T36AtUVUFkCwdH",
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/api/payments/razorpay/verify", {
              addressId: primaryAddress.id,
              couponCode: null,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              queryClient.invalidateQueries({ queryKey: ["cart"] });
              toast.success("Payment successful! Order placed.");
              navigate("/profile/my-orders");
            }
          } catch (err) {
            console.error("Payment Verification Failed:", err);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: primaryAddress.fullName || currentUser?.name || "Devotee",
          email: currentUser?.email || "devotee@krishnavasanam.com",
          contact: primaryAddress.phone || currentUser?.phone || "",
          method: selectedPayment,
        },
        theme: {
          color: "#d4af37",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        console.error(response.error);
        toast.error("Payment Failed. Reason: " + response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Checkout Failed:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-on-surface">
        Loading Checkout...
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">
      <main className="grow w-full px-8 md:px-16 lg:px-24 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Checkout Details */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            {/* Sacred Shipping Address */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary text-[20px]">
                  location_on
                </span>
                <h2 className="font-serif text-3xl font-bold text-primary tracking-wide">
                  Sacred Shipping Address
                </h2>
              </div>

              {primaryAddress ? (
                <div className="bg-[#fdfaf5] p-6 rounded-md border-[0.5px] border-tertiary/30 flex justify-between items-start">
                  <div>
                    <p className="font-sans text-sm font-semibold text-primary mb-1">
                      {primaryAddress.fullName}
                    </p>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      {primaryAddress.line1}
                    </p>
                    {primaryAddress.line2 && (
                      <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                        {primaryAddress.line2}
                      </p>
                    )}
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      {primaryAddress.city}, {primaryAddress.state} -{" "}
                      {primaryAddress.postalCode}
                    </p>
                    <p className="font-sans text-sm text-on-surface-variant mt-2">
                      {primaryAddress.phone}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/profile/addresses")}
                    className="text-tertiary font-sans text-sm font-semibold hover:underline transition-all cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="bg-[#fdfaf5] p-6 rounded-md border-[0.5px] border-tertiary/30 flex justify-between items-center">
                  <p className="font-sans text-sm text-on-surface-variant">
                    No address selected. Please add an address to continue.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/profile/addresses")}
                    className="bg-tertiary text-white px-4 py-2 rounded-md font-sans text-sm font-semibold hover:bg-tertiary/90 transition-all cursor-pointer"
                  >
                    Add Address
                  </button>
                </div>
              )}
            </section>

            {/* Separator */}
            <div className="h-px bg-tertiary/20 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-tertiary/50 bg-surface px-4 text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                diamond
              </span>
            </div>

            {/* Payment Method Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary text-[20px]">
                  payments
                </span>
                <h2 className="font-serif text-3xl font-bold text-primary tracking-wide">
                  Payment Method
                </h2>
              </div>

              <div className="border-[0.5px] border-tertiary/20 rounded-md bg-surface flex flex-col overflow-hidden shadow-sm">
                {/* Saved Cards */}
                <div
                  className={`p-4 transition-all ${selectedPayment === "card" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}
                >
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        className="appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer"
                        name="payment"
                        type="radio"
                        checked={selectedPayment === "card"}
                        onChange={() => setSelectedPayment("card")}
                      />
                    </div>
                    <span className="font-sans text-sm font-bold text-primary grow">
                      Credit or Debit Card
                    </span>
                  </label>

                  {selectedPayment === "card" && (
                    <div className="mt-4 ml-8 p-4 border-[0.5px] border-tertiary/30 rounded-md bg-surface shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-sans text-sm font-semibold text-primary">
                          Pay Securely via Razorpay
                        </span>
                        <span className="material-symbols-outlined text-tertiary/80 text-[20px]">
                          credit_card
                        </span>
                      </div>
                      <p className="font-sans text-sm text-on-surface-variant mb-4">
                        You will be redirected to the Razorpay payment gateway
                        to complete your transaction securely.
                      </p>
                    </div>
                  )}
                </div>

                <div className="h-px bg-tertiary/20 w-full"></div>

                {/* Net Banking */}
                <div
                  className={`p-4 transition-all ${selectedPayment === "netbanking" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}
                >
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        className="appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer"
                        name="payment"
                        type="radio"
                        checked={selectedPayment === "netbanking"}
                        onChange={() => setSelectedPayment("netbanking")}
                      />
                    </div>
                    <span className="font-sans text-sm font-bold text-primary grow">
                      Net Banking
                    </span>
                  </label>
                </div>

                <div className="h-px bg-tertiary/20 w-full"></div>

                {/* UPI */}
                <div
                  className={`p-4 transition-all ${selectedPayment === "upi" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}
                >
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        className="appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer"
                        name="payment"
                        type="radio"
                        checked={selectedPayment === "upi"}
                        onChange={() => setSelectedPayment("upi")}
                      />
                    </div>
                    <span className="font-sans text-sm font-bold text-primary grow">
                      Scan and Pay with UPI
                    </span>
                  </label>
                </div>

                <div className="h-px bg-tertiary/20 w-full"></div>

                {/* Cash on Delivery */}
                <div
                  className={`p-4 transition-all ${selectedPayment === "cod" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}
                >
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        className="appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer"
                        name="payment"
                        type="radio"
                        checked={selectedPayment === "cod"}
                        onChange={() => setSelectedPayment("cod")}
                      />
                    </div>
                    <div className="flex flex-col grow">
                      <span className="font-sans text-sm font-bold text-primary">
                        Cash on Delivery/Pay on Delivery
                      </span>
                      {selectedPayment === "cod" && (
                        <p className="font-sans text-xs text-on-surface-variant mt-1.5">
                          Cash, UPI and Cards accepted.{" "}
                          <span className="text-tertiary font-semibold hover:underline cursor-pointer">
                            Know more.
                          </span>
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="bg-[#eeeadd] rounded-md border-[0.5px] border-tertiary/20 p-8">
              <h3 className="font-serif text-2xl font-bold text-primary pb-4 border-b-[0.5px] border-tertiary/20 mb-6 tracking-wide">
                Order Summary
              </h3>

              {/* Product List Preview */}
              <div className="mb-6 space-y-4 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 rounded-md overflow-hidden bg-surface border-[0.5px] border-tertiary/20 shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt={item.product?.title || "Product"}
                        src={
                          item.product?.images?.[0]?.url ||
                          "https://placehold.co/400x500?text=No+Image"
                        }
                      />
                    </div>
                    <div className="grow flex flex-col">
                      <p className="font-sans text-sm font-bold text-primary mb-1 line-clamp-1">
                        {item.product?.title}
                      </p>
                      <p className="font-sans text-sm text-on-surface-variant mb-1">
                        Qty: {item.quantity}
                        {item.variant?.size && ` | Size: ${item.variant.size}`}
                      </p>
                      <p className="font-sans text-sm font-semibold text-tertiary">
                        ₹{" "}
                        {Number(
                          (item.variant?.price || item.product?.price || 0) *
                            item.quantity,
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-sans text-sm text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-sans text-sm text-on-surface-variant">
                  <span>Sacred Delivery</span>
                  <span className="text-tertiary font-semibold uppercase tracking-widest text-[10px]">
                    FREE
                  </span>
                </div>
                <div className="flex justify-between font-sans text-sm text-on-surface-variant">
                  <span>Temple GST (5%)</span>
                  <span>
                    ₹{" "}
                    {gst.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t-[0.5px] border-tertiary/20 flex justify-between items-end mb-8">
                <span className="font-serif text-2xl font-bold text-primary">
                  Total Amount
                </span>
                <span className="font-serif text-2xl font-bold text-tertiary">
                  ₹{" "}
                  {total.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-linear-to-r from-[#d4af37] via-[#c5a017] to-[#d4af37] text-primary font-sans text-sm font-bold py-4 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </button>

              <div className="flex items-center justify-center gap-2 text-on-surface-variant/80 text-[10px] uppercase tracking-widest mt-6">
                <span className="material-symbols-outlined text-[14px]">
                  lock
                </span>
                <span>Secure SSL Encrypted Payment</span>
              </div>
            </div>

            {/* Heritage Note */}
            <div className="mt-6 p-4 text-center">
              <p className="font-serif italic text-on-surface-variant/80 text-sm">
                &quot;Crafted with devotion, delivered with care.&quot;
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
