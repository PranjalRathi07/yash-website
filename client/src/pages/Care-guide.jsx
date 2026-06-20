/** @format */

export default function CareGuidePage() {
  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-tertiary/20 selection:text-primary">
      <main className="w-full px-4 md:px-8 lg:px-16 xl:px-24 py-20 flex flex-col gap-20">
        {/* Page Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6">
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary leading-none whitespace-nowrap shrink-0">
            Preserving Sacred Beauty
          </h1>
          <p className="font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed italic">
            Our garments are more than just attire; they are offerings of love.
            To maintain the divine luster and integrity of your Krishna Vasanam
            pieces, we invite you to follow these reverent care guidelines.
          </p>
        </div>

        {/* Care Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <div className="flex flex-col gap-12 lg:col-span-3 lg:sticky lg:top-32 h-fit">
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#7C98FF] font-semibold mb-6">
                CONTENTS
              </h4>
              <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
                <li>
                  <a
                    href="#washing-silk"
                    className="hover:text-primary transition-colors"
                  >
                    Washing Silk Vastra
                  </a>
                </li>
                <li>
                  <a
                    href="#jewelry-preservation"
                    className="hover:text-primary transition-colors"
                  >
                    Jewelry Preservation
                  </a>
                </li>
                <li>
                  <a
                    href="#mukut-care"
                    className="hover:text-primary transition-colors"
                  >
                    Mukut Care
                  </a>
                </li>
                <li>
                  <a
                    href="#altar-storage"
                    className="hover:text-primary transition-colors"
                  >
                    Altar Storage
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-low rounded-xl border-[0.5px] border-tertiary/20 p-6">
              <h4 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                LAST UPDATED
              </h4>
              <p className="font-sans text-sm text-on-surface-variant">
                October 15, 2024
              </p>
            </div>
          </div>

          {/* Main Body */}
          <div className="lg:col-span-9 flex flex-col gap-16">
            {/* Washing Silk Vastra */}
            <section className="scroll-mt-32" id="washing-silk">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-surface text-xl">
                    wash
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary">
                  Washing Silk Vastra
                </h2>
              </div>

              <div className="bg-surface-container-low rounded-xl border-[0.5px] border-tertiary/20 hover:border-tertiary transition-all duration-300 p-10 group">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2 aspect-4/5 rounded-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Silk fabric"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZLndY7fczOC6GgfJ2qivAS5GbbJufsr6Sil7QNAfvK9mhTEJpQGuX66mGtB7xrnmd5J4uWcbCMbJOrh12qdb0Cf2aMA690M9AIwDeBHUqwDvBOfWlOilVTSZ8jd3qnvyxJcNsJne7ufRI4nfGe-HRPE46bWPYW1xjHIiNM-dJ8GxtYgh3psyj0Ws6K1o0buqUMNTi4dfB3P9Qf7yhuEGTqa0gjyTJbkabgTVn-dbE4RBiTfepnd7uBYkPKeUHWMyKUZeABhR3uWPo"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="font-sans text-base text-on-surface-variant mb-6 leading-relaxed">
                      Hand-woven silks and embroidered fabrics require gentle
                      handling to preserve their structural divinity and color
                      vibrancy.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">
                          check_circle
                        </span>
                        <span className="font-sans text-sm text-on-surface-variant">
                          Cold water hand wash only with mild pH-neutral silk
                          detergent.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">
                          check_circle
                        </span>
                        <span className="font-sans text-sm text-on-surface-variant">
                          Avoid wringing or twisting the fabric; gently squeeze
                          out water.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">
                          check_circle
                        </span>
                        <span className="font-sans text-sm text-on-surface-variant">
                          Dry flat in shade, away from direct sunlight to
                          prevent fading.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 flex gap-6 border-t-[0.5px] border-tertiary/20 pt-6">
                  <div className="flex flex-col items-center gap-1 opacity-70">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      back_hand
                    </span>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-on-surface-variant">
                      Hand Wash
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-70">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      dry_cleaning
                    </span>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-on-surface-variant">
                      No Dry Clean
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-70">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      iron
                    </span>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-on-surface-variant">
                      Low Iron
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-t-[0.5px] border-tertiary/20" />

            {/* Jewelry Preservation */}
            <section className="scroll-mt-32" id="jewelry-preservation">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-surface text-xl">
                    auto_awesome
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary">
                  Jewelry Preservation
                </h2>
              </div>

              <div className="bg-primary text-surface rounded-2xl p-10 overflow-hidden relative">
                <p className="font-sans text-base text-surface/90 mb-8 leading-relaxed">
                  Our jewelry is crafted with semi-precious stones and gold
                  plating. Protect their celestial glow by following these
                  steps.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-surface-container-low/10 p-6 rounded-xl border-[0.5px] border-surface/20">
                    <h4 className="font-sans text-lg text-tertiary mb-2 font-semibold">
                      After Seva
                    </h4>
                    <p className="font-sans text-sm text-surface/80 leading-relaxed">
                      Wipe with a dry, soft cotton cloth to remove any traces of
                      sandalwood paste or kumkum.
                    </p>
                  </div>
                  <div className="bg-surface-container-low/10 p-6 rounded-xl border-[0.5px] border-surface/20">
                    <h4 className="font-sans text-lg text-tertiary mb-2 font-semibold">
                      Moisture Warning
                    </h4>
                    <p className="font-sans text-sm text-surface/80 leading-relaxed">
                      Avoid contact with water, perfumes, or essential oils used
                      in the altar.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <img
                    className="w-full h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500 border-[0.5px] border-surface/20"
                    alt="Gold jewelry pieces"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5gW6WatSLJ7U4TBe0zHAsda-2rR7XoEB3acMbfYaHOCPVmsADEsih52-ZLV0WgWugLanwWzPLdxlslZ5uzTtiID2EQ9UcAUrqSVC8lqjkHZZgToYUPYWRsHmXEijPZ6LO-4NgBOEPhc9h6p0Pxav8v0fxwzWSPfrn3CCUdd5hHJCHdXScjAmYvfclyeEhCPTlZa4s_T_YHpDrSVtMcn1gYq0On1kHw6aH3lIdnr6vmiZj7QU895-cGE3SfLVMwg9guGIKS6I6tFrw"
                  />
                </div>
              </div>
            </section>

            <hr className="border-t-[0.5px] border-tertiary/20" />

            {/* Mukut Care */}
            <section className="scroll-mt-32" id="mukut-care">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-surface text-xl">
                    crown
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary">
                  Mukut Care
                </h2>
              </div>

              <div className="bg-surface-container-low rounded-xl border-[0.5px] border-tertiary/20 p-10">
                <div className="aspect-video mb-8 rounded-xl overflow-hidden bg-surface border-[0.5px] border-tertiary/20">
                  <img
                    className="w-full h-full object-cover"
                    alt="Peacock-feather crown"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsNsLXdG89DrgxDsAJ2mta537QgS8sZWtKJF2T9Q0Wzu_cGH3xV6N12kcn-vCe09GzxeeAJuOhUv4L06B_k_OIfvs4B313dOFGKxymUepeOi05-HGXYNAB0XdiLZ-cdYT9DnaZfD65Mk3yQ0THopk80Y4L_402ys6IcUM-fhV6KKQ5_yOSOxu4GKAFkgIKHF9LxIbUr20Q0ZQaGcuy9NNr3t8Q6TrW60QPe3KR5FjKXisxk-timPB_tKk5vq0_2GfK6Ulorr7-2FUJ"
                  />
                </div>
                <p className="font-sans text-base text-on-surface-variant mb-6 leading-relaxed">
                  The Mukut (crown) is the highest ornament. Its structure is
                  delicate and often uses organic materials like peacock
                  feathers.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center p-4 bg-surface rounded-xl border-[0.5px] border-tertiary/10">
                    <span className="material-symbols-outlined text-tertiary">
                      cleaning_services
                    </span>
                    <span className="font-sans text-sm text-on-surface-variant">
                      Use a soft-bristled brush to remove dust from feather
                      tips.
                    </span>
                  </div>
                  <div className="flex gap-4 items-center p-4 bg-surface rounded-xl border-[0.5px] border-tertiary/10">
                    <span className="material-symbols-outlined text-tertiary">
                      compress
                    </span>
                    <span className="font-sans text-sm text-on-surface-variant">
                      Store in a rigid box to maintain its sacred shape.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-t-[0.5px] border-tertiary/20" />

            {/* Altar Storage */}
            <section className="scroll-mt-32" id="altar-storage">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-surface text-xl">
                    inventory_2
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary">
                  Altar Storage
                </h2>
              </div>

              <div className="bg-surface-container-low rounded-xl border-[0.5px] border-tertiary/20 p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-3/5">
                    <p className="font-sans text-base text-on-surface-variant mb-8 leading-relaxed">
                      A sacred space for storage ensures that the garments
                      remain fresh and protected from environmental factors like
                      humidity and insects.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-surface rounded-xl border-[0.5px] border-tertiary/10 flex flex-col gap-2">
                        <span className="material-symbols-outlined text-tertiary mb-1">
                          flutter_dash
                        </span>
                        <span className="font-sans text-sm font-semibold text-primary">
                          Breathable Bags
                        </span>
                        <span className="font-sans text-xs text-on-surface-variant">
                          Use muslin or cotton bags. Avoid plastic.
                        </span>
                      </div>
                      <div className="p-4 bg-surface rounded-xl border-[0.5px] border-tertiary/10 flex flex-col gap-2">
                        <span className="material-symbols-outlined text-tertiary mb-1">
                          eco
                        </span>
                        <span className="font-sans text-sm font-semibold text-primary">
                          Natural Repellents
                        </span>
                        <span className="font-sans text-xs text-on-surface-variant">
                          Dried neem leaves or lavender sachets.
                        </span>
                      </div>
                      <div className="p-4 bg-surface rounded-xl border-[0.5px] border-tertiary/10 flex flex-col gap-2">
                        <span className="material-symbols-outlined text-tertiary mb-1">
                          thermostat
                        </span>
                        <span className="font-sans text-sm font-semibold text-primary">
                          Cool & Dry
                        </span>
                        <span className="font-sans text-xs text-on-surface-variant">
                          Keep away from direct heat or damp corners.
                        </span>
                      </div>
                      <div className="p-4 bg-surface rounded-xl border-[0.5px] border-tertiary/10 flex flex-col gap-2">
                        <span className="material-symbols-outlined text-tertiary mb-1">
                          folder_special
                        </span>
                        <span className="font-sans text-sm font-semibold text-primary">
                          Seva Separation
                        </span>
                        <span className="font-sans text-xs text-on-surface-variant">
                          Store items separately to prevent snagging.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/5 flex flex-col">
                    <img
                      className="w-full h-full object-cover rounded-xl border-[0.5px] border-tertiary/20"
                      alt="Storage"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq-nBF_SKli0Bj3IAOPUf2EcccjvHajicXnl4DVIAAaNdRe2hFBf390ou9RxpGKplc2OtEXlIK9sYu_G7cBuyAqeMdaafWIGiOpKhXSO2RggfzZbeLyU2SJ3lHQICOU6AdEfuqJVBFa8jMwmVkpG0qJaiRkEl13-0aO5VeByJs37AVSydazXgHCoUvcdIwSm8cetDfFzjaK9HKPBE_fjgXZak0AKm5Q39c1LQJh91iNLPreSrF3XdGI_Pg5_o8dW5VNj-9x9fYI7yE"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-t-[0.5px] border-tertiary/20" />

            {/* CTA / Inquiry Section */}
            <section
              className="scroll-mt-32 bg-surface-container-low border-[0.5px] border-tertiary/20 p-12 rounded-2xl text-center"
              id="inquiry"
            >
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary mb-4">
                Unsure about a specific item?
              </h2>
              <p className="font-sans text-base text-on-surface-variant mb-10 max-w-xl mx-auto leading-relaxed">
                Our artisans are here to guide you. Contact our Seva support
                team for personalized advice on cleaning and restoration.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  className="flex items-center justify-center gap-3 bg-primary text-surface px-8 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all hover:bg-primary/90"
                  href="#"
                >
                  Chat with an Artisan
                </a>
                <a
                  className="flex items-center justify-center gap-3 bg-transparent border border-tertiary text-on-surface px-8 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary"
                  href="#"
                >
                  Care FAQ
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
