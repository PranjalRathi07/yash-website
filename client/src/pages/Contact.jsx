/** @format */

export default function ContactKrishnaVasanam() {
  const contactCards = [
    { icon: "forum", title: "WhatsApp Concierge", value: "+91 7457067630" },
    {
      icon: "mail",
      title: "Email Support",
      value: "Krishnavasanam@gmail.com",
    },
    { icon: "phone_in_talk", title: "Phone Line", value: "+91 7457067630" },
    {
      icon: "schedule",
      title: "Boutique Hours",
      value: (
        <>
          Mon - Sat: 10:00 AM - 7:00 PM (IST)
          <br />
          Sunday: Closed for Devotion
        </>
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const whatsappMessage = `*New Inquiry*\n\n*Name:* ${firstName} ${lastName}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917457067630?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased selection:bg-tertiary/20 selection:text-primary">
      {/* Main Content Canvas */}
      <main className="grow w-full px-8 md:px-16 lg:px-24 py-20">
        {/* Page Header */}
        <div className="mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b-[0.5px] border-tertiary/20 pb-6">
          <h1 className="font-serif text-6xl text-primary leading-none whitespace-nowrap shrink-0">
            Reach the Divine
          </h1>
          <p className="font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed">
            Connect with our artisans and concierges. We are here to assist you
            in finding your perfect Krishna Vasanam ensemble.
          </p>
        </div>

        {/* Contact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Contact Details Card (Left Col) */}
          <div className="md:col-span-5 bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-10 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <h2 className="font-serif text-3xl text-primary mb-10">
                Connect With Us
              </h2>

              <div className="space-y-8">
                {contactCards.map((c) => (
                  <div key={c.title} className="flex items-start gap-5 group">
                    <div className="p-3 border-[0.5px] border-tertiary/30 rounded-full text-tertiary group-hover:bg-linear-to-r group-hover:from-tertiary/80 group-hover:via-tertiary/90 group-hover:to-tertiary/80 group-hover:text-primary transition-all">
                      <span className="material-symbols-outlined text-[20px]">
                        {c.icon}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                        {c.title}
                      </h3>
                      <p className="font-sans text-sm text-on-surface-variant/80">
                        {c.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t-[0.5px] border-tertiary/20">
              <a
                className="flex items-center justify-between text-primary hover:text-tertiary transition-colors font-sans text-sm uppercase tracking-widest group"
                href="#"
              >
                <span>Follow our Journey</span>
                <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>

              <a
                className="flex items-center justify-between text-primary hover:text-tertiary transition-colors font-sans text-sm uppercase tracking-widest mt-6 group"
                href="#"
              >
                <span>Read our FAQs</span>
                <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Contact Form Card (Right Col) */}
          <div className="md:col-span-7 bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-10">
            <h2 className="font-serif text-3xl text-primary mb-4">
              Send a Message
            </h2>
            <p className="font-sans text-sm text-on-surface-variant mb-10">
              Please fill out the form below to inquire about custom orders,
              sizing, or general questions.
            </p>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <div>
                  <label className="sr-only" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-transparent border-b-[0.5px] border-tertiary/30 px-1 py-3 font-sans text-sm focus:border-primary focus:outline-none transition-colors placeholder:text-on-surface-variant/50"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-transparent border-b-[0.5px] border-tertiary/30 px-1 py-3 font-sans text-sm focus:border-primary focus:outline-none transition-colors placeholder:text-on-surface-variant/50"
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b-[0.5px] border-tertiary/30 px-1 py-3 font-sans text-sm focus:border-primary focus:outline-none transition-colors placeholder:text-on-surface-variant/50"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="subject">
                  Subject of Inquiry
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full bg-transparent border-b-[0.5px] border-tertiary/30 px-1 py-3 font-sans text-sm focus:border-primary focus:outline-none transition-colors text-on-surface-variant/80 cursor-pointer appearance-none"
                  defaultValue="Order Status"
                >
                  <option>Order Status</option>
                  <option>Custom Fitting / Sizing</option>
                  <option>Product Information</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How may we assist you today?"
                  className="w-full bg-transparent border-b-[0.5px] border-tertiary/30 px-1 py-3 font-sans text-sm focus:border-primary focus:outline-none transition-colors resize-none placeholder:text-on-surface-variant/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-primary text-surface font-sans text-sm uppercase tracking-widest flex justify-center items-center gap-3 shadow-[0_4px_20px_rgba(79,55,138,0.2)] hover:shadow-[0_4px_25px_rgba(79,55,138,0.3)] transition-all duration-300 mt-12"
              >
                Send Message
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
