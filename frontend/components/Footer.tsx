'use client';

import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t bg-muted/30 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Scale className="text-accent" size={24} />
                            <h3 className="text-xl font-bold text-primary">LexConnect</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            AI-augmented legal consultation platform connecting clients with verified lawyers anytime, anywhere.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button
                                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                                >
                                    How It Works
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                                >
                                    Features
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                                >
                                    Testimonials
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* For Lawyers */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">For Lawyers</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/lawyer/signup" className="text-muted-foreground hover:text-accent transition-colors">
                                    Join as Lawyer
                                </Link>
                            </li>
                            <li>
                                <Link href="/lawyer/dashboard" className="text-muted-foreground hover:text-accent transition-colors">
                                    Lawyer Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/lawyer/verification" className="text-muted-foreground hover:text-accent transition-colors">
                                    Verification Process
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} LexConnect. All rights reserved. Professional legal consultation platform.</p>
                </div>
            </div>
        </footer>
    );
}

