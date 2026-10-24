"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, User, FileText, Link as LinkIcon, CheckCircle2, Award, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SubmitProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "Top Digital Creators & Media",
    biography: "",
    profilePicture: "",
    website: "",
    company: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      contact: "",
    }
  });

  const categories = [
    "Top Digital Creators & Media",
    "Heritage & Sufism",
    "Politicians & Leaders",
    "Literature & Sindhi Poetry",
    "Arts & Culture",
    "Social Reform & Healthcare",
    "Education & Philosophy",
    "Tech, Startups & Business",
    "Sports & Youth Excellence"
  ];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const fData = new FormData();
    fData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fData,
      });
      const data = await res.json();
      
      // Support both { url } and { secure_url } returns
      const uploadedUrl = data.url || data.secure_url;
      if (uploadedUrl) {
        setFormData((prev) => ({ ...prev, profilePicture: uploadedUrl }));
      } else {
        // Fallback: If Cloudinary isn't configured, create local object preview URL or prompt
        const localPreview = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, profilePicture: localPreview }));
      }
    } catch (err) {
      console.warn("Upload fallback to local preview", err);
      const localPreview = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePicture: localPreview }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Generate clean unique slug
    const cleanName = formData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${cleanName}-${Date.now().toString().slice(-6)}`;

    try {
      const res = await fetch("/api/personalities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          category: formData.category,
          biography: formData.biography.trim(),
          profilePicture: formData.profilePicture,
          images: formData.profilePicture ? [formData.profilePicture] : [],
          company: formData.company?.trim(),
          website: formData.website?.trim(),
          socialLinks: formData.socialLinks,
          slug,
          status: "pending",
          featured: false,
          sponsored: false,
        }),
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/personalities"), 2800);
      } else {
        const data = await res.json();
        setError(data.error || "Submission failed. Please check required fields.");
      }
    } catch (err) {
      setError("Network error occurred. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center py-20">
        <div className="w-20 h-20 bg-[#801020]/30 border-2 border-[#d4af37] rounded-full flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(212,175,55,0.4)]">
          <CheckCircle2 className="h-10 w-10 text-[#d4af37]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
          Nomination Received!
        </h1>
        <p className="text-neutral-300 max-w-md text-sm sm:text-base leading-relaxed mb-6">
          Thank you for honoring Sindh's legacy. Your submission has been securely delivered to our editorial panel for archival review.
        </p>
        <span className="text-xs text-[#d4af37] bg-[#801020]/30 border border-[#801020]/60 px-4 py-1.5 rounded-full">
          Redirecting to Personalities directory...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10 border-b border-[#801020]/40 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#801020]/25 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] mb-3">
          <Award className="h-3.5 w-3.5" />
          سنڌ جي باصلاحيت شخصيت کي نامزد ڪريو
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-3">
          Nominate or Feature an Icon
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
          Help us document Sindh's finest digital creators, educators, statesmen, authors, and community heroes on Sindh Connect.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#12070a] border border-[#801020]/40 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-[#d4af37] flex items-center gap-2 border-b border-[#801020]/30 pb-2">
            <User className="h-5 w-5" /> Personality Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#1a0c11] border border-[#801020]/50 rounded-xl px-4 py-3 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-all placeholder-neutral-500"
                placeholder="e.g. Irfan Junejo, Dr. N.A. Baloch"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Field / Category *
              </label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[#1a0c11] border border-[#801020]/50 rounded-xl px-4 py-3 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-all cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c} className="bg-[#12070a] text-white">{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Organization / Affiliation (Optional)
              </label>
              <input 
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-[#1a0c11] border border-[#801020]/50 rounded-xl px-4 py-3 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-all placeholder-neutral-500"
                placeholder="e.g. SIUT Sindh, Independent Media"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Website or Portfolio URL (Optional)
              </label>
              <input 
                type="url" 
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full bg-[#1a0c11] border border-[#801020]/50 rounded-xl px-4 py-3 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-all placeholder-neutral-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Biography & Key Achievements *
            </label>
            <textarea 
              required
              rows={4}
              value={formData.biography}
              onChange={(e) => setFormData({...formData, biography: e.target.value})}
              className="w-full bg-[#1a0c11] border border-[#801020]/50 rounded-xl px-4 py-3 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-all placeholder-neutral-500 leading-relaxed"
              placeholder="Describe their contribution to Sindh, major career milestones, cultural impact, or social contributions..."
            />
          </div>

          {/* Profile Picture Upload & Direct URL */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Profile Photo (Upload or Paste Image URL)
            </label>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="h-24 w-24 rounded-2xl bg-[#1a0c11] border-2 border-dashed border-[#801020]/60 flex flex-col items-center justify-center overflow-hidden relative shrink-0">
                {formData.profilePicture ? (
                  <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-[#d4af37]/40" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-[#d4af37] animate-spin" />
                  </div>
                )}
              </div>
              
              <div className="flex-grow w-full space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer bg-[#801020] hover:bg-[#9c1427] border border-[#d4af37]/40 text-[#f4ede2] text-xs font-bold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
                    <Upload className="h-4 w-4 text-[#d4af37]" />
                    Upload Image File
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                  </label>
                  <span className="text-xs text-neutral-500 font-light">or enter direct link:</span>
                </div>
                <input 
                  type="url" 
                  value={formData.profilePicture}
                  onChange={(e) => setFormData({...formData, profilePicture: e.target.value})}
                  className="w-full bg-[#1a0c11] border border-[#801020]/40 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  placeholder="https://images.unsplash.com/... or uploaded link"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-[#d4af37] flex items-center gap-2 border-b border-[#801020]/30 pb-2">
            <LinkIcon className="h-5 w-5" /> Social & Contact Links (Optional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">YouTube / Channel Link</label>
              <input 
                type="url" 
                value={formData.socialLinks.linkedin}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})}
                className="w-full bg-[#1a0c11] border border-[#801020]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                placeholder="https://youtube.com/@channel"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Instagram URL</label>
              <input 
                type="url" 
                value={formData.socialLinks.instagram}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})}
                className="w-full bg-[#1a0c11] border border-[#801020]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                placeholder="https://instagram.com/profile"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">X / Twitter URL</label>
              <input 
                type="url" 
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, twitter: e.target.value}})}
                className="w-full bg-[#1a0c11] border border-[#801020]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                placeholder="https://x.com/username"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Contact Email / Phone</label>
              <input 
                type="text" 
                value={formData.socialLinks.contact}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, contact: e.target.value}})}
                className="w-full bg-[#1a0c11] border border-[#801020]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                placeholder="info@creator.com"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-gradient-to-r from-[#801020] to-[#9c1427] hover:from-[#9c1427] hover:to-[#b0172e] text-[#f4ede2] font-bold py-4 rounded-xl transition-all border border-[#d4af37]/50 shadow-[0_0_20px_rgba(128,16,32,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin text-[#d4af37]" /> : <FileText className="h-5 w-5 text-[#d4af37]" />}
            Submit Nominee for Archival Review
          </button>
        </div>
      </form>
    </div>
  );
}
