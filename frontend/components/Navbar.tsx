import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b bg-background">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        LegalConnect
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/browse" className="text-foreground hover:text-primary transition-colors">
                            Browse Professionals
                        </Link>
                        <Link href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
                            How It Works
                        </Link>
                        <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
                            Pricing
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
