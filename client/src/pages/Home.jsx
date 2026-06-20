import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import logoIcon from "../assets/Logo.png";
import api from "../services/api";

const ProductSkeleton = () => (
  <div className="flex flex-col group relative overflow-hidden bg-transparent">
    {/* Image Container Skeleton */}
    <div className="aspect-4/5 shimmer-bg mb-6 relative overflow-hidden" />

    {/* Info Section Skeleton */}
    <div className="grow flex flex-col">
      {/* Title Skeleton */}
      <div className="h-7 w-3/4 shimmer-bg mb-2" />
      {/* Category Skeleton */}
      <div className="h-3.5 w-1/3 shimmer-bg mb-4" />
      {/* Price & Add to Cart Skeleton */}
      <div className="mt-auto flex items-center justify-between">
        <div className="h-6 w-1/4 shimmer-bg" />
        <div className="h-10 w-10 rounded-full shimmer-bg" />
      </div>
    </div>
  </div>
);

export default function KrishnaVasanam() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [banners, setBanners] = useState([]);

  const cartMutation = useMutation({
    mutationFn: async (productId) => {
      return await api.post("/api/cart", { productId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    if (!localStorage.getItem("supabaseToken")) {
      navigate("/login");
      return;
    }
    cartMutation.mutate(productId);
  };

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: async () => {
      const res = await api.get("/api/products");
      return res.data;
    },
  });

  const newArrivals = productsData?.success
    ? productsData.products.filter((p) => p.isNewArrival).slice(0, 4)
    : [];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/api/banners");
        if (res.data?.success) {
          setBanners(res.data.banners.filter((b) => b.page === "Home"));
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
    };
    fetchBanners();
  }, []);

  const heroBanner = banners.find((b) => b.section === "Hero");
  const janmashtamiBanner = banners.find(
    (b) => b.section === "Janmashtami Special",
  );
  const featuredBanner = banners.find(
    (b) => b.section === "Featured Collection",
  );
  const categories = [
    { icon: "styler", label: "Daily Wear" },
    { icon: "celebration", label: "Festive Wear" },
    { icon: "temple_hindu", label: "Janmashtami" },
    { icon: "spa", label: "Accessories" },
    { icon: "diamond", label: "Jewelry" },
    { icon: "layers", label: "Premium Sets" },
    { icon: "ac_unit", label: "Winter" },
    { icon: "featured_seasonal_and_gifts", label: "Combo Packs" },
  ];

  return (
    <div className="bg-surface font-sans text-on-surface selection:bg-tertiary/20 selection:text-primary">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 w-full opacity-70">
          <img
            className="w-full h-full object-cover object-center"
            alt="Luxury silk fabric background"
            src={heroBanner?.imageUrl}
            onClick={() => heroBanner?.linkUrl && navigate(heroBanner.linkUrl)}
            style={{ cursor: heroBanner?.linkUrl ? "pointer" : "default" }}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/60 to-transparent" />

        <div className="relative w-full px-4 md:px-8 lg:px-16 xl:px-24 py-20 z-10 text-center lg:text-left">
          <span className="inline-block text-tertiary font-sans text-xs tracking-[0.2em] uppercase mb-6 font-semibold">
            HANDCRAFTED WITH DEVOTION
          </span>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-surface mb-8 max-w-2xl font-normal tracking-[-0.02em]">
            Dressing the Divine, Honouring the{" "}
            <span className="italic text-tertiary">Faith</span>
          </h1>
          <p className="font-sans text-lg text-surface/80 max-w-xl mb-12 leading-relaxed">
            Experience the sacred artisanal journey of dressing your deity. Each
            piece is meticulously crafted using premium silks and organic
            cottons.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Link
              to="/collection"
              className="bg-linear-to-r from-[#D4A017] to-[#F7C948] text-[#081B4B] px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-bold transition-all hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] border-none text-center"
            >
              Shop Collection
            </Link>
            <Link
              to="/festive-wear"
              className="bg-transparent border border-tertiary text-surface px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-linear-to-r hover:from-[#D4A017] hover:via-[#D4A017] hover:to-[#F7C948] hover:text-[#081B4B] hover:border-none text-center"
            >
              Explore Festive Wear
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-stack-xl w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl text-on-surface text-center mb-6">
            Shop by Category
          </h2>
          <div className="flex items-center justify-center w-full max-w-xs">
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-tertiary/50"></div>
            <div className="w-2 h-2 rounded-full bg-tertiary mx-4"></div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-tertiary/50"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {categories.map((c) => (
            <a
              key={c.label}
              className="group flex flex-col items-center text-center gap-4"
            >
              <div className="w-24 h-24 rounded-[40px] bg-surface-container-low flex items-center justify-center border-[0.5px] border-tertiary/20 transition-all duration-300 group-hover:border-tertiary group-hover:shadow-[0_20px_40px_rgba(31,31,31,0.04)] group-hover:-translate-y-1">
                <span className="material-symbols-outlined text-[32px] text-primary/80 group-hover:text-primary transition-colors">
                  {c.icon}
                </span>
              </div>
              <span className="font-sans text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
                {c.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="bg-surface-container-low py-stack-xl">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 relative scale-95">
            <div className="absolute -inset-4 border-[0.5px] border-tertiary/30 rounded-tl-[100px] rounded-br-[100px] z-0" />
            <img
              className="relative z-10 w-full object-cover rounded-tl-[100px] rounded-br-[100px] shadow-[0_20px_40px_rgba(31,31,31,0.04)] transition-transform duration-500 hover:scale-[1.02]"
              alt="Featured heritage collection"
              src={featuredBanner?.imageUrl}
              onClick={() =>
                featuredBanner?.linkUrl && navigate(featuredBanner.linkUrl)
              }
              style={{
                cursor: featuredBanner?.linkUrl ? "pointer" : "default",
              }}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <span className="text-tertiary font-sans text-xs uppercase tracking-[0.2em] mb-6 inline-block font-semibold">
              Featured Collection
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl text-on-surface mb-8 leading-[1.2]">
              The Golden Peacock Heritage
            </h2>
            <p className="font-sans text-lg text-on-surface-variant mb-10 leading-relaxed">
              Inspired by the traditional art of Vrindavan, this limited edition
              collection features hand-woven Zari work and ethically sourced
              peacock embellishments. Perfect for special Shringar ceremonies.
            </p>

            <Link
              to="/collection"
              className="bg-primary text-on-primary px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-primary/90 hover:shadow-lg"
              type="button"
            >
              Explore Heritage Range
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-stack-xl w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex justify-between items-end mb-16 border-b-[0.5px] border-tertiary/20 pb-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl text-on-surface">
              New Arrivals
            </h2>
            <p className="font-sans text-base text-on-surface-variant mt-2">
              Latest additions to our divine wardrobe.
            </p>
          </div>
          <Link
            className="text-primary font-sans text-xs uppercase tracking-[0.15em] pb-1 font-semibold hover:text-tertiary transition-colors"
            to="/new-arrivals"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))
          ) : newArrivals.length === 0 ? (
            <div className="col-span-full py-10 text-center text-on-surface-variant">
              No new arrivals found.
            </div>
          ) : (
            newArrivals.map((p) => {
              const discountPercent =
                p.oldPrice && p.oldPrice > p.price
                  ? Math.round((1 - p.price / p.oldPrice) * 100)
                  : 0;

              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="group relative flex flex-col transition-all duration-500 rounded-md overflow-hidden cursor-pointer"
                >
                  <div className="aspect-4/5 overflow-hidden rounded-md mb-6 relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={p.title}
                      src={p.images?.[0]?.url}
                    />
                    <span className="absolute top-4 left-4 bg-tertiary/10 text-tertiary backdrop-blur-md border border-tertiary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold">
                      New
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-on-surface mb-2 font-medium truncate">
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-4 truncate">
                    {p.category?.name || "Divine Attire"}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-lg text-primary font-medium">
                        ₹{Number(p.price).toLocaleString("en-IN")}
                      </span>
                      {discountPercent > 0 && (
                        <>
                          <span className="text-xs text-on-surface-variant line-through">
                            ₹{Number(p.oldPrice).toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-tertiary font-semibold">
                            ({discountPercent}% OFF)
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-tertiary/30 text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300 disabled:opacity-50"
                      onClick={(e) => handleAddToCart(e, p.id)}
                      disabled={cartMutation.isPending}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        shopping_bag
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Janmashtami Banner */}
      <section className="py-stack-xl px-8">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative rounded-tl-[100px] rounded-br-[100px] overflow-hidden min-h-125 flex items-center justify-center text-center shadow-[0_20px_40px_rgba(31,31,31,0.04)]">
          <div className="absolute inset-0 bg-primary/80 z-10 mix-blend-multiply" />
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Janmashtami banner"
            src={janmashtamiBanner?.imageUrl}
            onClick={() =>
              janmashtamiBanner?.linkUrl && navigate(janmashtamiBanner.linkUrl)
            }
            style={{
              cursor: janmashtamiBanner?.linkUrl ? "pointer" : "default",
            }}
          />

          <div className="relative z-20 max-w-2xl px-6 py-16">
            <span className="text-tertiary font-sans text-xs uppercase tracking-[0.2em] mb-6 inline-block font-semibold">
              Special Celebration
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-surface mb-8">
              Janmashtami Special Collection
            </h2>
            <p className="font-sans text-lg text-surface/90 mb-12 leading-relaxed">
              Prepare for the grand arrival. Explore exclusive designer wear
              crafted especially for the year's most sacred celebration.
            </p>
            <Link
              className="bg-surface text-primary px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-bold transition-all hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary hover:shadow-lg"
              type="button"
              to="/festive-wear"
            >
              View Janmashtami Range
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-stack-xl bg-surface">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex items-center justify-center w-full mb-16">
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-outline/30"></div>
            <div className="mx-6 material-symbols-outlined text-tertiary">
              spa
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-outline/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: "volunteer_activism",
                title: "100% Handcrafted",
                text: "Each attire is personally touched and crafted with devotion and prayer.",
              },
              {
                icon: "eco",
                title: "Pure Fabrics",
                text: "We use only pure silks, malmal cotton, and lead-free embellishments.",
              },
              {
                icon: "check_circle",
                title: "Perfect Fit",
                text: "Specially tailored for standard Laddu Gopal idol sizes 0 through 5.",
              },
              {
                icon: "local_shipping",
                title: "Safe Delivery",
                text: "Secure packaging and fast doorstep delivery across India and globally.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center group"
              >
                <span className="material-symbols-outlined text-[40px] text-tertiary mb-6 transition-transform group-hover:scale-110 duration-300">
                  {f.icon}
                </span>
                <h3 className="font-serif text-2xl text-on-surface mb-4 font-medium">
                  {f.title}
                </h3>
                <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size + Story */}
      <section className="py-stack-xl w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          <div className="w-full lg:w-1/3 bg-surface-container-low p-12 rounded-tl-[60px] rounded-br-[60px] border-[0.5px] border-tertiary/20 flex flex-col">
            <h2 className="font-serif text-[32px] text-primary mb-6">
              Find the Perfect Size
            </h2>
            <p className="font-sans text-base text-on-surface-variant mb-10 leading-relaxed">
              Measure the height of your deity from head to toe (excluding the
              crown base) to select the most appropriate size.
            </p>

            <div className="space-y-6 mb-12 flex-1">
              {[
                ["Size 0", "2.5 Inches"],
                ["Size 1", "3.5 Inches"],
                ["Size 2", "4.5 Inches"],
                ["Size 3", "5.5 Inches"],
                ["Size 4", "6.5 Inches"],
                ["Size 5", "7.5 Inches"],
              ].map(([s, v]) => (
                <div
                  key={s}
                  className="flex justify-between border-b-[0.5px] border-tertiary/20 pb-3"
                >
                  <span className="font-sans text-on-surface">{s}</span>
                  <span className="font-sans font-semibold text-primary">
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/size-guide")}
              className="w-full py-4 bg-transparent border border-tertiary text-on-surface font-sans text-xs uppercase tracking-widest font-semibold hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-colors rounded-md"
              type="button"
            >
              View Full Size Guide
            </button>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col justify-between py-6">
            <div className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl text-on-surface mb-8">
                Our Devotional Journey
              </h2>
              <p className="font-sans text-lg text-on-surface-variant mb-6 leading-relaxed">
                Krishna Vasanam was born out of a simple desire: to offer the
                same level of luxury and care to our beloved deities that we
                seek for ourselves. Each thread woven into our collections is a
                prayer, each bead an offering of love.
              </p>
              <p className="font-sans text-lg text-on-surface-variant mb-12 leading-relaxed">
                Our artisans in Vrindavan and Mathura carry centuries of
                tradition in their hands, ensuring that when you dress your
                Kanha ji, you are participating in a timeless ritual of beauty
                and faith.
              </p>

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border-[0.5px] border-tertiary/30 overflow-hidden flex items-center justify-center">
                  <img
                    alt="Logo Icon"
                    className="w-full h-full object-cover"
                    src={logoIcon}
                  />
                </div>
                <div>
                  <p className="font-serif text-2xl text-primary mb-1">
                    Krishna Vasanam
                  </p>
                  <p className="font-sans text-xs text-tertiary uppercase tracking-widest font-semibold">
                    Founded in Devotion
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "The quality of the silk is beyond anything I've bought before. My Laddu Gopal looks truly divine in the Golden Heritage set.",
                  name: "Radhika M.",
                },
                {
                  quote:
                    "The fitting was perfect for my Size 2 Bal Gopal. The packaging was also very safe and beautiful. Highly recommended.",
                  name: "Ananya S.",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-surface-container-low p-10 rounded-md border-[0.5px] border-tertiary/10 relative"
                >
                  <span className="absolute top-6 left-6 font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl text-tertiary/20 leading-none">
                    "
                  </span>
                  <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-8 relative z-10 pt-4">
                    {t.quote}
                  </p>
                  <p className="font-sans text-xs font-bold text-primary uppercase tracking-widest">
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
