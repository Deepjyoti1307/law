'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="text-lg font-bold text-white">
                        LexConnect
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <Link href="/about" className="text-white/60 hover:text-amber-400 transition-colors">
                            About
                        </Link>
                        <Link href="/privacy" className="text-white/60 hover:text-amber-400 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-white/60 hover:text-amber-400 transition-colors">
                            Terms
                        </Link>
                        <Link href="/contact" className="text-white/60 hover:text-amber-400 transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-white/40">
                        © {new Date().getFullYear()} LexConnect
                    </div>
                </div>
            </div>
        </footer>
    );
}

