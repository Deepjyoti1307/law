"use client";

import { motion } from "motion/react";
import { Award, MessageSquare, Scale, CheckCircle, Users, Info, X, Monitor, Shield, FileText, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns-1";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Verified Legal Professionals",
    title1 = "Talk to Verified Lawyers.",
    title2 = "Anytime, Anywhere.",
    description = "AI-powered legal consultation with verified lawyers.",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    // Prevent hydration mismatch by only rendering animations after mount
    const [mounted, setMounted] = useState(false);
    const [showHowItWorks, setShowHowItWorks] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* LexConnect Branding - Top Left */}
            <Link
                href="/"
                className="absolute top-6 left-6 md:top-8 md:left-8 z-20 text-2xl md:text-3xl font-bold text-amber-100/90 hover:text-amber-100 transition-colors tracking-tight"
            >
                LexConnect
            </Link>


            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8 md:mb-12"
                    >
                        <Award className="h-4 w-4 text-amber-400" />
                        <span className="text-sm text-white/70 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">
                                {title1}
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300">
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/50 mb-8 md:mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            {description}
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12"
                    >
                        <Button
                            size="lg"
                            variant="gradient"
                            icon={<Info size={20} />}
                            onClick={() => setShowHowItWorks(true)}
                        >
                            How It Works
                        </Button>
                        <Link href="/register">
                            <Button size="lg" variant="gradient" icon={<Scale size={20} />}>
                                Join as Lawyer
                            </Button>
                        </Link>
                    </motion.div>

                    {/* How It Works Modal */}
                    {showHowItWorks && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md will-change-auto"
                            onClick={() => setShowHowItWorks(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#1a2744] via-[#2a3a5a] to-[#3d4f6f] rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl will-change-transform"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowHowItWorks(false)}
                                    className="sticky top-3 right-3 sm:top-4 sm:right-4 float-right mr-3 mt-3 sm:mr-4 sm:mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-10"
                                >
                                    <X size={18} className="text-white sm:w-5 sm:h-5" />
                                </button>

                                <div className="p-4 sm:p-6 md:p-10 pt-0 sm:pt-0 md:pt-0">
                                    {/* Modal Header */}
                                    <div className="text-center mb-6 sm:mb-8 md:mb-10 mt-2">
                                        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3 text-white">How It Works</h2>
                                        <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto px-2">
                                            Simple, transparent process for both clients and lawyers
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                                        {/* For Clients */}
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-amber-400 flex items-center gap-2">
                                                <Users size={20} className="sm:w-6 sm:h-6" />
                                                For Clients
                                            </h3>
                                            <div className="space-y-4 sm:space-y-5">
                                                {[
                                                    { num: 1, title: "Describe Your Legal Issue", desc: "Our AI assistant helps you articulate your legal needs and matches you with the right lawyer." },
                                                    { num: 2, title: "Connect with Verified Lawyers", desc: "Choose from qualified lawyers based on expertise, reviews, and availability." },
                                                    { num: 3, title: "Get Expert Legal Guidance", desc: "Secure consultations, document management, and ongoing case support all in one place." }
                                                ].map((step) => (
                                                    <div
                                                        key={step.num}
                                                        className="flex gap-3 sm:gap-4 group"
                                                    >
                                                        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-amber-400/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-xs sm:text-sm group-hover:bg-amber-400/30 transition-colors duration-200">
                                                            {step.num}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-sm sm:text-base mb-1 text-white group-hover:text-amber-200 transition-colors duration-200">{step.title}</h4>
                                                            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* For Lawyers */}
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-blue-400 flex items-center gap-2">
                                                <Scale size={20} className="sm:w-6 sm:h-6" />
                                                For Lawyers
                                            </h3>
                                            <div className="space-y-4 sm:space-y-5">
                                                {[
                                                    { num: 1, title: "Join & Get Verified", desc: "Complete our straightforward verification process to prove your credentials and expertise." },
                                                    { num: 2, title: "Set Your Availability", desc: "Control your schedule and set consultation rates that work for you." },
                                                    { num: 3, title: "Grow Your Practice", desc: "Connect with clients, manage cases efficiently, and expand your professional network." }
                                                ].map((step) => (
                                                    <div
                                                        key={step.num}
                                                        className="flex gap-3 sm:gap-4 group"
                                                    >
                                                        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-400/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs sm:text-sm group-hover:bg-blue-400/30 transition-colors duration-200">
                                                            {step.num}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-sm sm:text-base mb-1 text-white group-hover:text-blue-200 transition-colors duration-200">{step.title}</h4>
                                                            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Why Choose LexConnect */}
                                    <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 md:pt-10 border-t border-white/10">
                                        <div className="text-center mb-5 sm:mb-6 md:mb-8">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white italic">Why Choose LexConnect</h3>
                                            <p className="text-xs sm:text-sm text-white/50 mt-2">Comprehensive legal consultation platform built for the modern age</p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                            {[
                                                { icon: Monitor, title: "AI Legal Assistant", desc: "Get instant preliminary guidance and case categorization powered by advanced AI." },
                                                { icon: CheckCircle, title: "Verified Lawyers", desc: "All lawyers are thoroughly verified with credentials, bar associations, and background checks." },
                                                { icon: Shield, title: "Secure Consultations", desc: "End-to-end encrypted video calls and messaging ensure complete confidentiality." },
                                                { icon: FileText, title: "Case History & Documents", desc: "Centralized document management and comprehensive case history tracking." }
                                            ].map((feature) => (
                                                <div
                                                    key={feature.title}
                                                    className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:border-amber-400/30 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 cursor-default"
                                                >
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-400/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                                                        <feature.icon size={16} className="text-amber-400 sm:w-5 sm:h-5" />
                                                    </div>
                                                    <h4 className="font-semibold text-xs sm:text-sm text-white mb-1">{feature.title}</h4>
                                                    <p className="text-[10px] sm:text-xs text-white/50 leading-relaxed">{feature.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* What Our Clients Say */}
                                    {(() => {
                                        const testimonials: Testimonial[] = [
                                            { name: "Sarah Mitchell", role: "Small Business Owner", text: "LexConnect helped me find the perfect lawyer for my business incorporation. The AI assistant made it so easy to explain my needs, and within hours I was consulting with an expert.", image: "https://randomuser.me/api/portraits/women/1.jpg" },
                                            { name: "James Rodriguez", role: "Corporate Attorney", text: "As a lawyer, joining LexConnect was one of the best decisions for my practice. The platform is intuitive, clients are pre-qualified, and I can manage everything in one place.", image: "https://randomuser.me/api/portraits/men/2.jpg" },
                                            { name: "Emily Chen", role: "Individual Client", text: "I was nervous about seeking legal help, but LexConnect made it approachable and affordable. The lawyer I connected with was compassionate and helped me navigate a difficult situation.", image: "https://randomuser.me/api/portraits/women/3.jpg" },
                                            { name: "Michael Patel", role: "Startup Founder", text: "The verification process gave me confidence in the lawyers I was working with. Highly recommend for any business owner.", image: "https://randomuser.me/api/portraits/men/4.jpg" },
                                            { name: "Jessica Wong", role: "Real Estate Investor", text: "Quick, professional, and reliable. LexConnect connected me with the right property lawyer within hours.", image: "https://randomuser.me/api/portraits/women/5.jpg" },
                                            { name: "David Kumar", role: "Family Law Client", text: "During a difficult time, LexConnect helped me find a compassionate family lawyer who truly understood my situation.", image: "https://randomuser.me/api/portraits/men/6.jpg" },
                                            { name: "Amanda Foster", role: "Immigration Attorney", text: "As an attorney, this platform has streamlined my client acquisition. The pre-qualified leads save me so much time.", image: "https://randomuser.me/api/portraits/women/7.jpg" },
                                            { name: "Robert Kim", role: "Tech Entrepreneur", text: "The AI-assisted intake made explaining my complex IP needs simple. Found the perfect IP attorney.", image: "https://randomuser.me/api/portraits/men/8.jpg" },
                                            { name: "Lisa Martinez", role: "HR Director", text: "Our company now uses LexConnect for all employment law consultations. Efficient and cost-effective.", image: "https://randomuser.me/api/portraits/women/9.jpg" },
                                        ];
                                        const firstColumn = testimonials.slice(0, 3);
                                        const secondColumn = testimonials.slice(3, 6);
                                        const thirdColumn = testimonials.slice(6, 9);

                                        return (
                                            <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 md:pt-10 border-t border-white/10">
                                                <div className="text-center mb-5 sm:mb-6 md:mb-8">
                                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">What Our Clients Say</h3>
                                                    <p className="text-xs sm:text-sm text-white/50 mt-2">Real experiences from people who found legal help through LexConnect</p>
                                                </div>
                                                <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[400px] sm:max-h-[450px] overflow-hidden">
                                                    <TestimonialsColumn testimonials={firstColumn} duration={18} />
                                                    <TestimonialsColumn testimonials={secondColumn} className="hidden sm:block" duration={22} />
                                                    <TestimonialsColumn testimonials={thirdColumn} className="hidden md:block" duration={20} />
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* CTA Button in Modal */}
                                    <div className="mt-6 sm:mt-8 md:mt-10 text-center">
                                        <Link href="/register" onClick={() => setShowHowItWorks(false)}>
                                            <Button size="lg" variant="gradient" icon={<MessageSquare size={18} className="sm:w-5 sm:h-5" />}>
                                                Get Started Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Trust indicators */}
                    <motion.div
                        custom={4}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-white/60"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-amber-400/80" />
                            <span>500+ Verified Lawyers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-amber-400/80" />
                            <span>24/7 Availability</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-amber-400/80" />
                            <span>Secure & Confidential</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744] via-transparent to-[#1a2744]/50 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric, ElegantShape };
