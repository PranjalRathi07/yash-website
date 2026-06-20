import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function OurStoryPage() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/api/banners");
        if (res.data?.success) {
          setBanners(res.data.banners.filter((b) => b.page === "OurStory"));
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
    };
    fetchBanners();
  }, []);

  const artisanalImage = banners.find(
    (b) => b.section === "Artisanal Weaving",
  )?.imageUrl;
  const radiantImage = banners.find(
    (b) => b.section === "Radiant Silk",
  )?.imageUrl;
  const precisionImage = banners.find(
    (b) => b.section === "Precision Detail",
  )?.imageUrl;
  const cocoonImage = banners.find(
    (b) => b.section === "Silk Cocoon",
  )?.imageUrl;
  const dyeImage = banners.find((b) => b.section === "Organic Dye")?.imageUrl;

  return (
    <div
      lang="en"
      className="bg-surface text-on-surface font-sans antialiased selection:bg-tertiary/20 selection:text-primary"
    >
      <main className="w-full">
        {/* Section: Generations of Artistry */}
        <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative p-4 border-[0.5px] border-tertiary/20 rounded-xl bg-[#FDFBF7] z-10">
                <img
                  alt="Artisanal Weaving"
                  className="rounded-lg w-full aspect-4/5 object-cover"
                  src={artisanalImage}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-[0.5px] border-tertiary/40 rounded-xl z-0 bg-transparent" />
            </div>
            <div className="order-1 lg:order-2 max-w-lg">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
                Generations of Artistry
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-tertiary/40" />
                <div className="w-2 h-2 rotate-45 bg-tertiary" />
                <div className="w-12 h-px bg-tertiary/40" />
              </div>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-6">
                Our lineage traces back to the master weavers of Varanasi and
                Kanchipuram, who have dedicated their lives to the service of
                the divine. We have preserved the ancient secrets of &quot;Asli
                Zari&quot; weaving, ensuring that every Vastra for Laddu Gopal
                carries the weight of history and the lightness of devotion.
              </p>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-10 italic">
                &quot;We do not just manufacture clothing; we weave the physical
                manifestation of a devotee&apos;s love for their Lord.&quot;
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">
                    verified
                  </span>
                  <span className="font-sans text-sm text-on-surface-variant">
                    Traditional Pit Looms Only
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">
                    verified
                  </span>
                  <span className="font-sans text-sm text-on-surface-variant">
                    Generational Master Craftsmen
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">
                    verified
                  </span>
                  <span className="font-sans text-sm text-on-surface-variant">
                    Hand-Drawn Gold Embroidery
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: The Essence of Tejas (Bento Grid) */}
        <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-[#050B14] text-surface overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-tertiary font-semibold mb-6 block">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-tertiary mb-6">
              The Essence of Tejas
            </h2>
            <p className="font-sans text-base text-surface/80 leading-relaxed max-w-2xl mx-auto">
              Tejas is the radiant glow of the divine. Our mission is to capture
              this luminescence in every thread, creating attire that
              doesn&apos;t just clothe the deity, but illuminates the shrine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#0B152A] p-10 rounded-xl border-[0.5px] border-tertiary/20 relative overflow-hidden flex flex-col justify-end min-h-100">
              <div className="absolute inset-0 opacity-40">
                <img
                  alt="Radiant Silk"
                  className="w-full h-full object-cover"
                  src={radiantImage}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B152A] via-[#0B152A]/50 to-transparent" />
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-tertiary mb-3">
                  Divine Radiance
                </h3>
                <p className="font-sans text-sm text-surface/80 max-w-md leading-relaxed">
                  Our fabrics are treated with traditional herbal infusions to
                  enhance their natural luster, ensuring they catch the flicker
                  of every Diya.
                </p>
              </div>
            </div>

            <div className="bg-[#FDF4D9] p-10 rounded-xl flex flex-col justify-center items-center text-center text-primary">
              <span
                className="material-symbols-outlined text-2xl md:text-3xl lg:text-4xl mb-6"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                flare
              </span>
              <h3 className="font-serif text-2xl mb-3">The Glow</h3>
              <p className="font-sans text-sm font-medium leading-relaxed max-w-50">
                Capture the light of a thousand suns in a single weave.
              </p>
            </div>

            <div className="bg-[#111A2E] p-10 rounded-xl border-[0.5px] border-tertiary/20">
              <h3 className="font-serif text-2xl text-tertiary mb-4">
                Sacred Patterns
              </h3>
              <p className="font-sans text-sm text-surface/80 leading-relaxed">
                Every motif—from the Lotus to the Peacock feather—is carefully
                researched for its spiritual significance and traditional
                accuracy.
              </p>
            </div>

            <div className="md:col-span-2 bg-[#0C172C] p-10 rounded-xl border-[0.5px] border-tertiary/20 flex flex-col sm:flex-row items-center sm:justify-start justify-center text-center sm:text-left gap-8">
              <div className="shrink-0 w-32 h-32 rounded-full border-[0.5px] border-tertiary p-1 flex items-center justify-center">
                <img
                  alt="Detail"
                  className="w-full h-full object-cover rounded-full"
                  src={precisionImage}
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-tertiary mb-3">
                  Impeccable Precision
                </h3>
                <p className="font-sans text-sm text-surface/80 leading-relaxed max-w-lg">
                  A single Vastra can take up to 120 hours of manual labor to
                  complete, reflecting our dedication to perfection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Pure Ingredients */}
        <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-surface">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
                Purity in Every Thread
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-tertiary/40" />
                <div className="w-2 h-2 rotate-45 bg-tertiary" />
                <div className="w-12 h-px bg-tertiary/40" />
              </div>
              <p className="font-sans text-base text-on-surface-variant mb-12 leading-relaxed">
                We believe that what touches the Deity must be as pure as the
                devotion itself. We source only the finest materials, ensuring
                that every step of our process respects the environment and the
                living beings within it.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    nature
                  </span>
                  <div>
                    <h4 className="font-sans text-sm text-primary font-semibold mb-2">
                      Cruelty-Free Ahimsa Silk
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Silk harvested only after the moth has naturally left the
                      cocoon, honoring the sanctity of life.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    eco
                  </span>
                  <div>
                    <h4 className="font-sans text-sm text-primary font-semibold mb-2">
                      Organic Vegetable Dyes
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Extracted from turmeric, indigo, and madder root to create
                      vibrant yet gentle hues.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    star
                  </span>
                  <div>
                    <h4 className="font-sans text-sm text-primary font-semibold mb-2">
                      Authentic Silver & Gold Zari
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      No imitation metals. Only pure silver wire electroplated
                      with 24-carat gold for eternal shine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center gap-6">
              <img
                alt="Silk Cocoon"
                className="rounded-2xl aspect-square object-cover w-[45%] shadow-lg"
                src={cocoonImage}
              />
              <img
                alt="Organic Dye"
                className="rounded-2xl aspect-square object-cover w-[45%] shadow-lg mt-16"
                src={dyeImage}
              />
            </div>
          </div>
        </section>

        {/* Call to Worship (Final Section) */}
        <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-[#FDFBF7] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-tertiary/20" />
          <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
            <span className="material-symbols-outlined text-tertiary text-3xl md:text-4xl lg:text-5xl mb-6">
              workspace_premium
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
              Invite Divine Elegance Home
            </h2>
            <p className="font-sans text-base text-on-surface-variant mb-10">
              Explore our curated collections of Vastras, jewelry, and
              accessories, each one a testament to our devotion and
              craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/collection"
                className="bg-linear-to-r from-tertiary/80 via-tertiary/90 to-tertiary/80 text-primary px-8 py-4 font-sans text-xs font-semibold tracking-widest uppercase rounded-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                SHOP THE COLLECTION
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border-[0.5px] border-tertiary/20 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[0.5px] border-tertiary/20 rounded-full" />
        </section>
      </main>
    </div>
  );
}
