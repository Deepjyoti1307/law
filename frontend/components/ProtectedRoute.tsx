'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
    requireAuth?: boolean;
}

export function ProtectedRoute({
    children,
    allowedRoles,
    requireAuth = true
}: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        // Redirect to login if auth required and user not authenticated
        if (requireAuth && !isAuthenticated) {
            router.push('/login');
            return;
        }

        // Check role-based access
        if (allowedRoles && user && !allowedRoles.includes(user.role)) {
            // Redirect to appropriate dashboard
            router.push(`/dashboard/${user.role.toLowerCase()}`);
            return;
        }
    }, [isAuthenticated, isLoading, user, router, allowedRoles, requireAuth]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated and auth required
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    // Don't render if role not allowed
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
