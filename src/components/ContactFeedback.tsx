import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, Shield, HelpCircle } from 'lucide-react';

export const ContactFeedback: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'contact' | 'feedback'>('contact');

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Test Drive / VIP Demonstration',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Feedback Form State
  const [feedbackData, setFeedbackData] = useState({
    category: 'Customizer Suggestions',
    rating: 5,
    comments: ''
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email) return;
    setContactSubmitted(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackData.comments) return;
    setFeedbackSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/40 border border-red-900/60 px-3 py-1 rounded">
            <Mail className="w-3.5 h-3.5" />
            COMMUNICATIONS & SUPPORT RELAY
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            GET IN <span className="text-metallic">TOUCH</span>
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-lg mx-auto">
            Book a test drive, request fleet consultation, or submit engineering feedback to the CyberForge team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 clip-chamfer shadow-2xl space-y-6">
            
            {/* Form Mode Selector */}
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
              <button
                onClick={() => setActiveForm('contact')}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors ${
                  activeForm === 'contact'
                    ? 'bg-red-600 text-white shadow-red-glow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900'
                }`}
              >
                Inquiries & Test Drive
              </button>
              <button
                onClick={() => setActiveForm('feedback')}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors ${
                  activeForm === 'feedback'
                    ? 'bg-red-600 text-white shadow-red-glow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900'
                }`}
              >
                Community Feedback
              </button>
            </div>

            {/* CONTACT FORM */}
            {activeForm === 'contact' ? (
              !contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-400 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcus Vance"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="pilot@domain.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-400 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Interest Category</label>
                      <select
                        value={contactData.interest}
                        onChange={(e) => setContactData({ ...contactData, interest: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                      >
                        <option>Test Drive / VIP Demonstration</option>
                        <option>Commercial Fleet Inquiries</option>
                        <option>Cybertruck Delivery Status</option>
                        <option>CyberForge Community Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Your Message or Requirements</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your preferred configuration or questions..."
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all shadow-red-glow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto" />
                  <h3 className="text-lg font-bold text-white uppercase">
                    Transmission Received
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    A CyberForge specialist will contact {contactData.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactData({ name: '', email: '', phone: '', interest: 'Test Drive / VIP Demonstration', message: '' });
                    }}
                    className="mt-4 px-4 py-2 bg-neutral-900 text-neutral-300 text-xs rounded border border-neutral-800 hover:text-white"
                  >
                    Send Another Transmission
                  </button>
                </div>
              )
            ) : (
              /* FEEDBACK FORM */
              !feedbackSubmitted ? (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="text-neutral-400 block mb-1">Feedback Category</label>
                    <select
                      value={feedbackData.category}
                      onChange={(e) => setFeedbackData({ ...feedbackData, category: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                    >
                      <option>Customizer Features & 3D Visuals</option>
                      <option>Community Chat Experience</option>
                      <option>Vehicle Technical Data</option>
                      <option>Bug Report / Glitch</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Platform Rating (1 to 5 Stars)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                          className={`w-9 h-9 rounded font-mono font-bold flex items-center justify-center border transition-all ${
                            feedbackData.rating >= star
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                          }`}
                        >
                          {star}★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Detailed Suggestions or Experience *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share your thoughts on how to make CyberForge even better..."
                      value={feedbackData.comments}
                      onChange={(e) => setFeedbackData({ ...feedbackData, comments: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all shadow-red-glow flex items-center justify-center gap-2"
                  >
                    <span>Submit Community Feedback</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto" />
                  <h3 className="text-lg font-bold text-white uppercase">
                    Feedback Logged into Core
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Your ratings and suggestions directly influence upcoming CyberForge platform releases.
                  </p>
                  <button
                    onClick={() => {
                      setFeedbackSubmitted(false);
                      setFeedbackData({ category: 'Customizer Suggestions', rating: 5, comments: '' });
                    }}
                    className="mt-4 px-4 py-2 bg-neutral-900 text-neutral-300 text-xs rounded border border-neutral-800 hover:text-white"
                  >
                    Submit New Feedback
                  </button>
                </div>
              )
            )}

          </div>

          {/* Right Column: Global Support Hubs */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 clip-chamfer space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                CyberForge Command Hubs
              </h3>

              <div className="space-y-3 text-xs font-mono text-neutral-400">
                <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800">
                  <span className="text-white font-bold block">Gigafactory Texas HQ</span>
                  <span>1 Tesla Road, Austin, TX 78725</span>
                  <span className="text-[10px] text-red-500 block mt-1">Direct Delivery & Torture Track</span>
                </div>

                <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800">
                  <span className="text-white font-bold block">Moab Overland Base</span>
                  <span>Sand Flats Trailhead, Moab, UT 84532</span>
                  <span className="text-[10px] text-red-500 block mt-1">Off-Road Testing & Supercharger Hub</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 clip-chamfer space-y-3 text-xs font-mono">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" />
                24/7 Roadside Assistance
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Emergency remote diagnostics and mobile service units are dispatched via satellite uplink anywhere on continental trails.
              </p>
              <div className="pt-2 text-red-500 font-bold">
                HOTLINE: 1-800-CYBER-FORGE
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
