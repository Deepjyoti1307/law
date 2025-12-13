import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import Link from 'next/link';
import { Scale, Shield, MessageSquare, FileText, CheckCircle, Users, Clock, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section variant="gradient" className="relative overflow-hidden py-8 md:py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center py-6 md:py-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 md:mb-6 text-sm">
            <Award size={16} />
            <span>Verified Legal Professionals</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 leading-tight">
            Talk to Verified Lawyers.<br />Anytime, Anywhere.
          </h1>
          <p className="text-base md:text-lg mb-6 md:mb-7 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Get instant access to AI-augmented legal consultation. Connect with experienced,
            verified lawyers for secure consultations and comprehensive case management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-8">
            <Link href="/register">
              <Button size="lg" variant="gradient" icon={<MessageSquare size={20} />}>
                Get Legal Help
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="gradient" icon={<Scale size={20} />}>
                Join as Lawyer
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>500+ Verified Lawyers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>Secure & Confidential</span>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent process for both clients and lawyers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Clients */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-2">
                <Users size={28} />
                For Clients
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Describe Your Legal Issue</h4>
                    <p className="text-muted-foreground">Our AI assistant helps you articulate your legal needs and matches you with the right lawyer.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Connect with Verified Lawyers</h4>
                    <p className="text-muted-foreground">Choose from qualified lawyers based on expertise, reviews, and availability.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Get Expert Legal Guidance</h4>
                    <p className="text-muted-foreground">Secure consultations, document management, and ongoing case support all in one place.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Lawyers */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <Scale size={28} />
                For Lawyers
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Join & Get Verified</h4>
                    <p className="text-muted-foreground">Complete our straightforward verification process to prove your credentials and expertise.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Set Your Availability</h4>
                    <p className="text-muted-foreground">Control your schedule and set consultation rates that work for you.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Grow Your Practice</h4>
                    <p className="text-muted-foreground">Connect with clients, manage cases efficiently, and expand your professional network.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" variant="dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose LexConnect</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Comprehensive legal consultation platform built for the modern age
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card icon={<MessageSquare size={24} />} className="bg-white/5 border-white/10 hover:border-accent">
              <h3 className="font-semibold text-lg mb-2 text-white">AI Legal Assistant</h3>
              <p className="text-sm text-white/70">
                Get instant preliminary guidance and case categorization powered by advanced AI.
              </p>
            </Card>

            <Card icon={<Shield size={24} />} className="bg-white/5 border-white/10 hover:border-accent">
              <h3 className="font-semibold text-lg mb-2 text-white">Verified Lawyers</h3>
              <p className="text-sm text-white/70">
                All lawyers are thoroughly verified with credentials, bar associations, and background checks.
              </p>
            </Card>

            <Card icon={<Clock size={24} />} className="bg-white/5 border-white/10 hover:border-accent">
              <h3 className="font-semibold text-lg mb-2 text-white">Secure Consultations</h3>
              <p className="text-sm text-white/70">
                End-to-end encrypted video calls and messaging ensure complete confidentiality.
              </p>
            </Card>

            <Card icon={<FileText size={24} />} className="bg-white/5 border-white/10 hover:border-accent">
              <h3 className="font-semibold text-lg mb-2 text-white">Case History & Documents</h3>
              <p className="text-sm text-white/70">
                Centralized document management and comprehensive case history tracking.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from people who found legal help through LexConnect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "LexConnect helped me find the perfect lawyer for my business incorporation. The AI assistant
                  made it so easy to explain my needs, and within hours I was consulting with an expert."
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Sarah Mitchell</p>
                <p className="text-sm text-muted-foreground">Small Business Owner</p>
              </div>
            </Card>

            <Card className="bg-card">
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "As a lawyer, joining LexConnect was one of the best decisions for my practice. The platform
                  is intuitive, clients are pre-qualified, and I can manage everything in one place."
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">James Rodriguez</p>
                <p className="text-sm text-muted-foreground">Corporate Attorney</p>
              </div>
            </Card>

            <Card className="bg-card">
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "I was nervous about seeking legal help, but LexConnect made it approachable and affordable.
                  The lawyer I connected with was compassionate and helped me navigate a difficult situation."
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Emily Chen</p>
                <p className="text-sm text-muted-foreground">Individual Client</p>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
