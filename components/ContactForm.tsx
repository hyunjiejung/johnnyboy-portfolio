"use client";

import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import confetti from "canvas-confetti";
import { MoveRight, Loader2 } from "lucide-react";

export default function ContactForm() {
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setLoading(true);

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setLoading(false);
                    setSuccess(true);
                    form.current?.reset();
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#E60023', '#000000', '#ffffff']
                    });

                    setTimeout(() => setSuccess(false), 5000);
                },
                (error) => {
                    console.log(error.text);
                    setLoading(false);
                    alert("Failed to send message. Please try again.");
                }
            );
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl relative overflow-hidden">
            {success && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10 backdrop-blur-md">
                    <div className="p-6 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">✓</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-sm text-gray-500">Johnny Boy will get back to you soon.</p>
                    </div>
                </div>
            )}

            <h2 className="text-3xl font-bold mb-8 text-gray-900 italic text-center">Get in Touch</h2>

            <form ref={form} onSubmit={sendEmail} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Name</label>
                    <input
                        type="text"
                        name="user_name"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-gray-400"
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                    <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-gray-400"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Message</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none placeholder:text-gray-400"
                        placeholder="Tell me about your project..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-black text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            Send Message
                            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
