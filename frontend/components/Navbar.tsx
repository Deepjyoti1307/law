'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent border-transparent'
            }`}>
            <div className="container mx-auto px-4 py-5">
                <div className="flex items-center">
                    <Link href="/" className="text-3xl md:text-4xl font-bold text-amber-100 tracking-tight">
                        LexConnect
                    </Link>
                </div>
            </div>
        </nav>
    );
}

