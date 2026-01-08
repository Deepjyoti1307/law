"use client";
import React from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-4 pb-4"
            >
                {[...new Array(2).fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                        {props.testimonials.map(({ text, image, name, role }, i) => (
                            <div
                                className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm max-w-xs w-full hover:border-white/20 transition-colors duration-200"
                                key={i}
                            >
                                {/* Stars */}
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={14}
                                            className="text-amber-400 fill-amber-400"
                                        />
                                    ))}
                                </div>

                                {/* Quote icon */}
                                <Quote size={18} className="text-white/20 mb-2" />

                                {/* Testimonial text */}
                                <p className="text-sm text-white/70 italic leading-relaxed mb-4">
                                    "{text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <img
                                        width={40}
                                        height={40}
                                        src={image}
                                        alt={name}
                                        className="h-10 w-10 rounded-full object-cover border-2 border-white/10"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-white text-sm leading-5">{name}</span>
                                        <span className="text-xs text-white/50 leading-5">{role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))]}
            </motion.div>
        </div>
    );
};

export default TestimonialsColumn;
