import { optimizeImage } from "../../utils/optimizeCloudinary";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../../services/api";
import toast from "react-hot-toast";

const PLACEHOLDER_BANNER = "https://placehold.co/600x300?text=No+Banner+Image";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Upload modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newBanner, setNewBanner] = useState({
    page: "Home",
    section: "Hero",
    linkUrl: "",
    priority: "0",
    isActive: true,
  });
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/banners/admin/all");
      if (response.data.success) {
        setBanners(response.data.banners);
      }
    } catch (err) {
      console.error("Failed to load banners:", err);
      setError(
        "Failed to retrieve visual campaigns from the database sanctuary.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      await Promise.resolve();
      if (isMounted) {
        await fetchBanners();
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [fetchBanners]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleToggleActive = async (id, currentActive) => {
    try {
      const response = await api.put(`/api/banners/${id}`, {
        isActive: !currentActive,
      });
      if (response.data.success) {
        fetchBanners();
      } else {
        toast.error("Failed to modify banner status: " + response.data.message);
      }
    } catch (err) {
      console.error("Banner toggle error:", err);
      toast.error(
        "Error updating visibility: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  const handleDeleteBanner = async (id) => {
    if (
      confirm("Are you sure you want to delete this visual campaign banner?")
    ) {
      try {
        const response = await api.delete(`/api/banners/${id}`);
        if (response.data.success) {
          toast.success("Banner campaign deleted successfully.");
          fetchBanners();
        } else {
          toast.error("Failed to delete banner: " + response.data.message);
        }
      } catch (err) {
        console.error("Banner delete error:", err);
        toast.error(
          "Error deleting campaign: " +
            (err.response?.data?.message || err.message),
        );
      }
    }
  };

  const handleUploadBanner = async (e) => {
    e.preventDefault();
    if (!bannerFile) {
      toast.error(
        "Please fill all required fields, including the banner image.",
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("page", newBanner.page);
      formData.append("section", newBanner.section);
      formData.append("linkUrl", newBanner.linkUrl);
      formData.append("priority", newBanner.priority);
      formData.append("isActive", newBanner.isActive.toString());
      formData.append("image", bannerFile);

      const response = await api.post("/api/banners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Sacred visual campaign created successfully!");
        setShowUploadModal(false);
        setNewBanner({
          page: "Home",
          section: "Hero",
          linkUrl: "",
          priority: "0",
          isActive: true,
        });
        setBannerFile(null);
        setBannerPreview(null);
        fetchBanners();
      } else {
        toast.error("Failed to create banner: " + response.data.message);
      }
    } catch (err) {
      console.error("Banner upload error:", err);
      toast.error(
        "An error occurred during upload: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  const filteredBanners = banners.filter(
    (c) =>
      c.page?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.section?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex">
      {/* SIDEBAR: SideNavBar */}
      <Sidebar activeTab="banners" />

      {/* MAIN CONTAINER */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen bg-surface-container-lowest">
        {/* TOP BAR: TopNavBar */}
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search banners..."
        />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-8 animate-fadeIn">
          {/* Header Section */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-primary">
                Banner Sanctuary
              </h2>
              <p className="text-on-surface-variant/80 mt-2 text-base font-sans">
                Manage the visual aura of the Krishna Vasanam digital boutique.
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="gradient-btn text-primary px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined">
                add_photo_alternate
              </span>
              <span>Upload New Banner</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: "Active Campaigns",
                value: banners.filter((b) => b.isActive).length.toString(),
              },
              {
                label: "Scheduled Banners",
                value: banners.filter((b) => !b.isActive).length.toString(),
              },
              { label: "Total Banners", value: banners.length.toString() },
              { label: "Database State", value: "Verified" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant/20 transition-all hover:border-tertiary-fixed"
              >
                <p className="text-on-surface-variant/70 text-xs font-bold uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-serif font-bold text-primary">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Bento Campaigns List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 bg-surface text-center rounded-2xl border border-outline-variant/20 shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-tertiary animate-spin mb-4">
                sync
              </span>
              <p className="text-on-surface-variant font-serif text-lg">
                Retrieving visual canvases from backend...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-20 bg-surface text-center rounded-2xl border border-red-100 shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-red-600 mb-4">
                error
              </span>
              <p className="text-red-700 font-bold mb-2">{error}</p>
            </div>
          ) : filteredBanners.length === 0 ? (
            <div
              className="border-2 border-dashed border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center p-12 text-center hover:bg-surface-container transition-all group cursor-pointer h-72"
              onClick={() => setShowUploadModal(true)}
            >
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-tertiary-fixed transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px] text-on-surface-variant group-hover:text-primary">
                  add
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-primary">
                No Campaigns Logged
              </h4>
              <p className="text-xs text-on-surface-variant/70 mt-1">
                Click to enshrine your first visual display campaign
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBanners.map((camp) => (
                <div
                  key={camp.id}
                  className={`bg-surface p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-tertiary-fixed ${
                    !camp.isActive ? "opacity-75" : ""
                  }`}
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden relative group mb-6 bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={optimizeImage(camp.imageUrl) || PLACEHOLDER_BANNER}
                      alt={`${camp.page} - ${camp.section}`}
                      onError={(e) => {
                        e.target.src = PLACEHOLDER_BANNER;
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-primary text-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-outline-variant/10">
                      Priority: {camp.priority}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-on-surface-variant/70 mb-2 block truncate">
                        Redirects: {camp.linkUrl || "No Link Target"}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-primary mb-2 leading-tight truncate">
                        {camp.page}
                      </h3>
                      <p className="text-xs text-on-surface-variant/80 font-sans mb-6 line-clamp-2 h-8">
                        Section: {camp.section}
                      </p>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl border border-outline-variant/10">
                          <span className="text-xs font-semibold text-primary">
                            Active visibility
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={camp.isActive}
                              onChange={() =>
                                handleToggleActive(camp.id, camp.isActive)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 border-t border-outline-variant/15 pt-4">
                      <button
                        onClick={() =>
                          toast(
                            `Redirect URL target: ${camp.linkUrl || "None"}`,
                          )
                        }
                        className="flex-1 border border-outline-variant/30 text-primary py-2 rounded-lg hover:bg-surface-container transition-colors text-xs font-bold cursor-pointer"
                      >
                        Check Target Link
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(camp.id)}
                        className="p-2 border border-outline-variant/30 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New campaign Campaign placeholder */}
              <div
                onClick={() => setShowUploadModal(true)}
                className="border-2 border-dashed border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:bg-surface-container transition-all group cursor-pointer h-100"
              >
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-tertiary-fixed transition-colors duration-300">
                  <span className="material-symbols-outlined text-[32px] text-on-surface-variant group-hover:text-primary">
                    add
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-primary">
                  New Canvas
                </h4>
                <p className="text-xs text-on-surface-variant/70 mt-1">
                  Add a new visual display campaign
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Upload Banner Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl p-6 border border-outline-variant/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-primary">
                Upload Display Banner
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-outline-variant hover:text-primary focus:outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined" data-icon="close">
                  close
                </span>
              </button>
            </div>

            <form onSubmit={handleUploadBanner} className="space-y-4">
              {/* Banner Image Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2">
                  Banner Image Canvas <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-center gap-4 border border-dashed border-outline-variant/30 p-4 rounded-lg bg-surface-container-low">
                  {bannerPreview ? (
                    <div className="w-full aspect-video rounded overflow-hidden border border-outline-variant/10 shadow-inner relative group bg-surface-container">
                      <img
                        src={bannerPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBannerFile(null);
                          setBannerPreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow focus:outline-none transition-all flex items-center justify-center cursor-pointer"
                      >
                        <span
                          className="material-symbols-outlined text-xs"
                          style={{ fontSize: "14px" }}
                        >
                          close
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6 relative w-full cursor-pointer hover:bg-surface-container-high/40 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                      />
                      <span className="material-symbols-outlined text-[36px] text-tertiary mb-2">
                        add_photo_alternate
                      </span>
                      <p className="text-xs font-bold text-primary">
                        Select Wide Aspect Banner Image
                      </p>
                      <p className="text-[10px] text-on-surface-variant/60 mt-1">
                        Recommended: 1920x800 px
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Page & Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2">
                    Target Page <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newBanner.page}
                    onChange={(e) =>
                      setNewBanner({
                        ...newBanner,
                        page: e.target.value,
                        section:
                          e.target.value === "Home" ? "Hero" : "Top Banner",
                      })
                    }
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface"
                    required
                  >
                    <option value="Home">Home Page</option>
                    <option value="Products">Products Page</option>
                    <option value="Categories">Categories Page</option>
                    <option value="About">About</option>
                    <option value="OurStory">Our Story</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2">
                    Target Section <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newBanner.section}
                    onChange={(e) =>
                      setNewBanner({ ...newBanner, section: e.target.value })
                    }
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface"
                    required
                  >
                    {newBanner.page === "Home" && (
                      <>
                        <option value="Hero">Hero Section</option>
                        <option value="Janmashtami Special">
                          Janmashtami Special
                        </option>
                        <option value="Featured Collection">
                          Featured Collection
                        </option>
                      </>
                    )}
                    {newBanner.page === "About" && (
                      <>
                        <option value="Top Banner">Top Banner</option>
                        <option value="Hero Image">Hero Image</option>
                        <option value="Artisan Craftsmanship">Artisan Craftsmanship</option>
                        <option value="Opulent Details">Opulent Details</option>
                      </>
                    )}
                    {newBanner.page === "OurStory" && (
                      <>
                        <option value="Top Banner">Top Banner</option>
                        <option value="Artisanal Weaving">Artisanal Weaving</option>
                        <option value="Radiant Silk">Radiant Silk</option>
                        <option value="Precision Detail">Precision Detail</option>
                        <option value="Silk Cocoon">Silk Cocoon</option>
                        <option value="Organic Dye">Organic Dye</option>
                      </>
                    )}
                    {newBanner.page !== "Home" && newBanner.page !== "About" && newBanner.page !== "OurStory" && (
                      <option value="Top Banner">Top Banner</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Grid Redirects & priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2">
                    Redirect Link URL
                  </label>
                  <input
                    value={newBanner.linkUrl}
                    onChange={(e) =>
                      setNewBanner({ ...newBanner, linkUrl: e.target.value })
                    }
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface"
                    placeholder="e.g. /collection"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2">
                    Priority Order
                  </label>
                  <input
                    value={newBanner.priority}
                    onChange={(e) =>
                      setNewBanner({ ...newBanner, priority: e.target.value })
                    }
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface"
                    placeholder="e.g. 0"
                    type="number"
                  />
                </div>
              </div>

              {/* Active Toggle & Submit */}
              <div className="flex items-center justify-between border-t border-outline-variant/15 pt-4 mt-6">
                <label className="flex items-center gap-3 cursor-pointer group relative">
                  <input
                    type="checkbox"
                    checked={newBanner.isActive}
                    onChange={(e) =>
                      setNewBanner({ ...newBanner, isActive: e.target.checked })
                    }
                    className="peer appearance-none w-5 h-5 border-[1.5px] border-outline-variant/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer"
                  />
                  <span
                    className="material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none"
                    style={{ marginLeft: "3px" }}
                  >
                    check
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors ml-1">
                    Publish Immediately
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 border border-outline-variant/30 rounded-lg text-xs font-bold text-primary hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white font-bold rounded-lg px-5 py-2 text-xs hover:bg-primary-container transition-all shadow"
                  >
                    Publish Canvas
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
