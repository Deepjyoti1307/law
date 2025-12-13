'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-background'
            }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                        LexConnect
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="text-foreground hover:text-accent transition-colors cursor-pointer"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection('features')}
                            className="text-foreground hover:text-accent transition-colors cursor-pointer"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('testimonials')}
                            className="text-foreground hover:text-accent transition-colors cursor-pointer"
                        >
                            Testimonials
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pt-4 pb-2 space-y-3 border-t mt-4">
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="block w-full text-left py-2 text-foreground hover:text-accent transition-colors"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection('features')}
                            className="block w-full text-left py-2 text-foreground hover:text-accent transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('testimonials')}
                            className="block w-full text-left py-2 text-foreground hover:text-accent transition-colors"
                        >
                            Testimonials
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
