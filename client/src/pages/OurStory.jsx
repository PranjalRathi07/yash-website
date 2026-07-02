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
        {/* Section: The Story Behind Krishna Vasanam */}
        <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative p-4 border-[0.5px] border-tertiary/20 rounded-xl bg-[#FDFBF7] z-10">
                <img
                  alt="Krishna Vasanam"
                  className="rounded-lg w-full aspect-4/5 object-cover"
                  src={artisanalImage}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-[0.5px] border-tertiary/40 rounded-xl z-0 bg-transparent" />
            </div>
            <div className="order-1 lg:order-2 max-w-lg">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
                The Story Behind Krishna Vasanam
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-tertiary/40" />
                <div className="w-2 h-2 rotate-45 bg-tertiary" />
                <div className="w-12 h-px bg-tertiary/40" />
              </div>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-6">
                Every great journey begins with faith, devotion, and a purpose greater than oneself. Krishna Vasanam was born from a heartfelt desire to bring devotees closer to Lord Krishna through beautifully crafted devotional clothing and customized spiritual designs.
              </p>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-6">
                The name &quot;Krishna Vasanam&quot; carries a deep spiritual meaning. In Sanskrit, Vasanam means &quot;attire&quot; or &quot;clothing,&quot; while Krishna represents the embodiment of divine love, compassion, and eternal joy. Together, Krishna Vasanam signifies &quot;The Divine Attire of Lord Krishna&quot; — clothing and creations inspired by devotion and designed to honor the beloved Lord.
              </p>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-6">
                The foundation of the brand was laid in 2026, a year made even more special because the brand was launched on the sacred occasion of Janmashtami, which also coincided with the birthday of the brand&apos;s founder. This unique alignment was seen as a divine blessing and a sign to dedicate the venture to Lord Krishna&apos;s service.
              </p>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed italic">
                What started as a vision to create unique devotional designs soon evolved into a mission to provide devotees with meaningful, high-quality, and personalized creations. We recognized that every devotee expresses devotion differently, and therefore every design should reflect a personal spiritual connection. This inspired us to offer both exclusive ready-made collections and customized designs tailored to individual requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Mission & Vision (Bento Grid) */}
        <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-[#050B14] text-surface overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-tertiary font-semibold mb-6 block">
              The Foundation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-tertiary mb-6">
              Our Mission & Vision
            </h2>
            <p className="font-sans text-base text-surface/80 leading-relaxed max-w-2xl mx-auto">
              Krishna Vasanam is not just a brand; it is a celebration of devotion, creativity, and the eternal love of Lord Krishna. 🙏✨
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Our Mission */}
            <div className="md:col-span-2 bg-[#0B152A] p-10 rounded-xl border-[0.5px] border-tertiary/20 relative overflow-hidden flex flex-col justify-end min-h-100">
              <div className="absolute inset-0 opacity-40">
                <img
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                  src={radiantImage}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B152A] via-[#0B152A]/50 to-transparent" />
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-tertiary mb-3">
                  Our Mission
                </h3>
                <p className="font-sans text-sm text-surface/80 max-w-md leading-relaxed">
                  To create devotional apparel and spiritual designs that help devotees express their faith, celebrate their devotion, and carry the divine presence of Lord Krishna in their daily lives.
                </p>
              </div>
            </div>

            {/* Motto */}
            <div className="bg-[#FDF4D9] p-10 rounded-xl flex flex-col justify-center items-center text-center text-primary">
              <span
                className="material-symbols-outlined text-2xl md:text-3xl lg:text-4xl mb-6"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <h3 className="font-serif text-2xl mb-3">Our Motto</h3>
              <p className="font-sans text-sm font-medium leading-relaxed max-w-50">
                &quot;Woven with Devotion, Inspired by Krishna.&quot;<br /><br />&quot;Where Faith Meets Design.&quot;
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-[#111A2E] p-10 rounded-xl border-[0.5px] border-tertiary/20">
              <h3 className="font-serif text-2xl text-tertiary mb-4">
                Our Vision
              </h3>
              <p className="font-sans text-sm text-surface/80 leading-relaxed">
                To become a trusted devotional lifestyle brand that connects spirituality, creativity, and tradition, inspiring devotees around the world through meaningful and personalized designs.
              </p>
            </div>

            {/* Our Promise */}
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
                  Our Promise
                </h3>
                <p className="font-sans text-sm text-surface/80 leading-relaxed max-w-lg">
                  At Krishna Vasanam, we believe that devotion is personal, and every creation should reflect that sacred bond. Whether it is a special festival, a temple event, a spiritual gathering, or a personalized gift, our aim is to create designs that carry the essence of Krishna&apos;s grace and blessings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: What Makes Us Different */}
        <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-surface">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
                What Makes Us Different
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-tertiary/40" />
                <div className="w-2 h-2 rotate-45 bg-tertiary" />
                <div className="w-12 h-px bg-tertiary/40" />
              </div>
              <p className="font-sans text-base text-on-surface-variant mb-12 leading-relaxed">
                Every design is crafted to celebrate devotion and divine love. We take pride in our unique approach to spiritual clothing and designs.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    design_services
                  </span>
                  <div>
                    <h4 className="font-sans text-sm text-primary font-semibold mb-2">
                      Unique Krishna-Inspired Designs
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Created with pure devotion to reflect the beauty and grace of the Lord.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    handyman
                  </span>
                  <div>
                    <h4 className="font-sans text-sm text-primary font-semibold mb-2">
                      Customized Creations
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Tailored for special occasions and personal requirements, reflecting your unique spiritual connection.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    auto_awesome
                  </span>
                  <div>
                    <h4 className="font-sans text-sm text-primary font-semibold mb-2">
                      Tradition Meets Creativity
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      A seamless blend of traditional spirituality and modern creativity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    verified
                  </span>
                  <div>
                    <h4 className="font-sans text-sm text-primary font-semibold mb-2">
                      Commitment to Quality
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We ensure authenticity and customer satisfaction in every piece we create.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center gap-6">
              <img
                alt="Devotion in Design"
                className="rounded-2xl aspect-square object-cover w-[45%] shadow-lg"
                src={cocoonImage}
              />
              <img
                alt="Spiritual Creativity"
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
