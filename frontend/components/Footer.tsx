import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t bg-muted/50 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-primary mb-4">LegalConnect</h3>
                        <p className="text-sm text-muted-foreground">
                            AI-powered professional services platform connecting clients with expert professionals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                                    Browse Professionals
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Professionals */}
                    <div>
                        <h4 className="font-semibold mb-4">For Professionals</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/professional/signup" className="text-muted-foreground hover:text-primary transition-colors">
                                    Join as Professional
                                </Link>
                            </li>
                            <li>
                                <Link href="/professional/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                                    Professional Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} LegalConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
