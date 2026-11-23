import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, Shield, HelpCircle, Calendar, Clock } from 'lucide-react';
import { cyberAudio } from '../lib/cyberAudio';

export const ContactFeedback: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'contact' | 'feedback'>('contact');

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Test Drive / VIP Demonstration',
    hub: 'Austin Gigafactory Delivery Hub, TX',
    preferredDate: '2026-12-05',
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
    cyberAudio.playLaser();
    setContactSubmitted(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackData.comments) return;
    cyberAudio.playLaser();
    setFeedbackSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen text-zinc-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 uppercase tracking-widest bg-zinc-900 border border-zinc-700 px-3 py-1 rounded">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            TEST DRIVE DISPATCH & FLEET CONSULTATION
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            TEST DRIVE & <span className="text-metallic">CONTACT</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono max-w-lg mx-auto">
            Experience the steer-by-wire and beast mode acceleration firsthand. Book a VIP test drive or submit inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-lg p-6 sm:p-8 clip-chamfer shadow-2xl space-y-6">
            
            {/* Form Mode Selector */}
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
              <button
                onClick={() => {
                  cyberAudio.playClick(900);
                  setActiveForm('contact');
                }}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors ${
                  activeForm === 'contact'
                    ? 'bg-zinc-200 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white bg-zinc-900'
                }`}
              >
                Book Test Drive & Inquiries
              </button>
              <button
                onClick={() => {
                  cyberAudio.playClick(900);
                  setActiveForm('feedback');
                }}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors ${
                  activeForm === 'feedback'
                    ? 'bg-zinc-200 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white bg-zinc-900'
                }`}
              >
                Platform Feedback
              </button>
            </div>

            {/* CONTACT / TEST DRIVE FORM */}
            {activeForm === 'contact' ? (
              !contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-400 block mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcus Vance"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="pilot@domain.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-400 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Interest Category</label>
                      <select
                        value={contactData.interest}
                        onChange={(e) => setContactData({ ...contactData, interest: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                      >
                        <option>Test Drive / VIP Demonstration</option>
                        <option>Commercial Fleet Inquiries</option>
                        <option>Cybertruck Delivery Status</option>
                        <option>CyberForge Community Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-400 block mb-1">Preferred Location Hub</label>
                      <select
                        value={contactData.hub}
                        onChange={(e) => setContactData({ ...contactData, hub: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                      >
                        <option>Austin Gigafactory Delivery Hub, TX</option>
                        <option>Fremont Advanced Vehicle Center, CA</option>
                        <option>Moab Overland Logistics Hub, UT</option>
                        <option>Direct-to-Home White Glove Test Drive</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={contactData.preferredDate}
                        onChange={(e) => setContactData({ ...contactData, preferredDate: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Special Requirements or Questions</label>
                    <textarea
                      rows={3}
                      placeholder="Specify off-road test preferences, questions on powershare, etc..."
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-zinc-200 hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Test Drive Reservation</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-zinc-200 mx-auto" />
                  <h3 className="text-lg font-bold text-white uppercase">
                    Test Drive Reservation Received
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    A CyberForge vehicle coordinator will contact {contactData.email} within 24 hours to confirm your time slot at {contactData.hub}.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactData({ name: '', email: '', phone: '', interest: 'Test Drive / VIP Demonstration', hub: 'Austin Gigafactory Delivery Hub, TX', preferredDate: '2026-12-05', message: '' });
                    }}
                    className="mt-4 px-4 py-2 bg-zinc-900 text-zinc-300 text-xs rounded border border-zinc-800 hover:text-white"
                  >
                    Submit Another Request
                  </button>
                </div>
              )
            ) : (
              /* FEEDBACK FORM */
              !feedbackSubmitted ? (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="text-zinc-400 block mb-1">Feedback Category</label>
                    <select
                      value={feedbackData.category}
                      onChange={(e) => setFeedbackData({ ...feedbackData, category: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                    >
                      <option>3D Studio Configurator Experience</option>
                      <option>Community Chat & Pilot Directory</option>
                      <option>Vehicle Technical Data</option>
                      <option>Suggestions for New Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Platform Rating (1 to 5 Stars)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                          className={`w-9 h-9 rounded font-mono font-bold flex items-center justify-center border transition-all ${
                            feedbackData.rating >= star
                              ? 'bg-zinc-200 border-white text-zinc-950'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                          }`}
                        >
                          {star}★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Your Detailed Feedback *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share your experience and thoughts with our engineering team..."
                      value={feedbackData.comments}
                      onChange={(e) => setFeedbackData({ ...feedbackData, comments: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-zinc-200 hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Submit Community Feedback</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-zinc-200 mx-auto" />
                  <h3 className="text-lg font-bold text-white uppercase">
                    Feedback Logged into Core
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Your ratings and suggestions directly influence upcoming vehicle and platform releases.
                  </p>
                  <button
                    onClick={() => {
                      setFeedbackSubmitted(false);
                      setFeedbackData({ category: 'Customizer Suggestions', rating: 5, comments: '' });
                    }}
                    className="mt-4 px-4 py-2 bg-zinc-900 text-zinc-300 text-xs rounded border border-zinc-800 hover:text-white"
                  >
                    Submit New Feedback
                  </button>
                </div>
              )
            )}

          </div>

          {/* Right Column: Global Support Hubs */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-6 clip-chamfer space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-400" />
                CyberForge Delivery & Tech Hubs
              </h3>

              <div className="space-y-3 text-xs font-mono text-zinc-400">
                <div className="p-3 bg-zinc-950/70 rounded border border-zinc-800">
                  <span className="text-white font-bold block">Gigafactory Texas HQ</span>
                  <span>1 Tesla Road, Austin, TX 78725</span>
                  <span className="text-[10px] text-zinc-400 block mt-1">Direct Delivery & Torture Track</span>
                </div>

                <div className="p-3 bg-zinc-950/70 rounded border border-zinc-800">
                  <span className="text-white font-bold block">Moab Overland Base</span>
                  <span>Sand Flats Trailhead, Moab, UT 84532</span>
                  <span className="text-[10px] text-zinc-400 block mt-1">Off-Road Testing & Supercharger Hub</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-6 clip-chamfer space-y-3 text-xs font-mono">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-zinc-400" />
                24/7 Roadside Assistance
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans">
                Emergency remote diagnostics and mobile service units are dispatched via satellite uplink anywhere on continental trails.
              </p>
              <div className="pt-2 text-zinc-200 font-bold font-mono">
                FLEET DISPATCH: 1-800-CYBER-FORGE
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
