"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';

const EmailSection = () => {
  const [formState, setFormState] = useState({ submitted: false });
  // Third return value `reset` clears Formspree's internal `succeeded` flag
  // so subsequent submissions actually go through. Without this, the hook
  // short-circuits every submit after the first one until a full page reload.
  const [state, handleSubmit, reset] = useForm('xldrljwz');
  const formRef = useRef(null);

  useEffect(() => {
    if (state.succeeded) {
      setFormState({ submitted: true });
    }
  }, [state.succeeded]);

  const resetForm = () => {
    if (typeof reset === "function") reset();      // clears Formspree state
    formRef.current?.reset();                       // clears the input values
    setFormState({ submitted: false });
  };

  return (
    <section
      id="contact"
      className="section-style section-shell"
    >
      {/* Decorative gradient overlays — match other sections */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[530px] h-[280px] bg-primary-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/10 blur-2xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-300/10 blur-2xl rounded-full" />
      </div>

      {/* Subtle inner glow ring */}
      <div className="absolute inset-0 z-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-800/10 via-secondary-800/5 to-primary-500/10 opacity-50 rounded-2xl" />
        <div className="absolute inset-0 border border-white/5 rounded-2xl" />
      </div>

      <div className="section-inner">
        {/* Standard centered header — same shape as Projects/Blog */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Contact Me</h2>
          <p>
            Have a project in mind or want to explore opportunities? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Full-width form (no more duplicated 'Connect with me' card) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          {formState.submitted ? (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-900/20 to-green-800/30 p-5 sm:p-8 md:p-10 rounded-xl border border-green-500/30 backdrop-blur-sm shadow-lg shadow-green-500/5 transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500/80 to-green-500/0"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-2xl rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/10 blur-2xl rounded-full -ml-8 -mb-8"></div>

              <div className="flex flex-col items-center my-4">
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-3">Message Sent!</h3>
              </div>
              <p className="text-green-200/90 mb-8 text-center text-base mx-auto max-w-md">
                Thank you for reaching out! Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={resetForm}
                className="relative w-full py-3 px-6 mt-2 mb-4 rounded-full border border-primary-400 text-white text-base font-semibold bg-transparent hover:bg-primary-700/20 hover:border-primary-500 transition-all duration-200 group"
              >
                <span className="relative flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 group-hover:text-primary-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-semibold tracking-tight text-primary-300 group-hover:text-white transition-colors duration-200">Send Another Message</span>
                </span>
              </button>
            </motion.div>
          ) : (
            <div key="contact-form" className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 sm:p-8 md:p-10 rounded-xl border border-slate-700/40 shadow-lg shadow-primary-500/5 transition-all duration-300 backdrop-blur-sm overflow-hidden relative group hover:border-primary-500/30 hover:shadow-md hover:shadow-primary-500/20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 blur-2xl rounded-full -mr-8 -mt-8 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/10 blur-2xl rounded-full -ml-8 -mb-8 pointer-events-none"></div>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:via-primary-500/80 transition-colors duration-300 pointer-events-none"></div>

              <form ref={formRef} className="relative z-10 mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="relative group/field">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300 block mb-1.5 ml-1 group-hover/field:text-primary-300 transition-colors duration-200">Your Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-hover/field:text-primary-400 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      required
                      className="bg-slate-800/70 text-white block w-full pl-10 pr-3 py-3 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 placeholder:text-slate-500 transition-all duration-200 group-hover/field:border-primary-500/30"
                      placeholder="name@example.com"
                    />
                  </div>
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1 ml-1" />
                </div>

                <div className="relative group/field">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-300 block mb-1.5 ml-1 group-hover/field:text-primary-300 transition-colors duration-200">Subject</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-hover/field:text-primary-400 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                    <input
                      name="subject"
                      type="text"
                      id="subject"
                      required
                      className="bg-slate-800/70 text-white block w-full pl-10 pr-3 py-3 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 placeholder:text-slate-500 transition-all duration-200 group-hover/field:border-primary-500/30"
                      placeholder="What's this about?"
                    />
                  </div>
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-400 text-sm mt-1 ml-1" />
                </div>

                <div className="relative group/field">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300 block mb-1.5 ml-1 group-hover/field:text-primary-300 transition-colors duration-200">Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none text-slate-400 group-hover/field:text-primary-400 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      className="bg-slate-800/70 text-white block w-full pl-10 pr-3 py-3 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 placeholder:text-slate-500 transition-all duration-200 resize-none group-hover/field:border-primary-500/30"
                      placeholder="Hi Omar, I'd like to discuss..."
                    ></textarea>
                  </div>
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1 ml-1" />
                </div>

                {/* Button — same vertical breathing room as the success-dialog button */}
                <div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="relative w-full py-3 px-6 mt-2 mb-4 rounded-full border border-primary-400 text-white text-base font-semibold bg-transparent hover:bg-primary-700/20 hover:border-primary-500 transition-all duration-200 disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:border-primary-400/50 group"
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      {state.submitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-primary-400 group-hover:text-primary-300 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="font-semibold tracking-tight text-primary-300 group-hover:text-white transition-colors duration-200">Sending...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 group-hover:text-primary-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span className="font-semibold tracking-tight text-primary-300 group-hover:text-white transition-colors duration-200">Send Message</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSection;
