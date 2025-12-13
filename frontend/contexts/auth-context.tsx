'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User, AuthContextType, LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsLoading(false);
                return;
            }

            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                // Token invalid, try to refresh
                await refreshToken();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            const data: AuthResponse = await response.json();

            // Store tokens
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            setUser(data.user);

            // Redirect based on role
            redirectByRole(data.user.role);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Registration failed');
            }

            const data: AuthResponse = await response.json();

            // Store tokens
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            setUser(data.user);

            // Redirect based on role
            redirectByRole(data.user.role);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const loginWithGoogle = async (googleToken: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: googleToken }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Google login failed');
            }

            const data: AuthResponse = await response.json();

            // Store tokens
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            setUser(data.user);

            // Redirect based on role
            redirectByRole(data.user.role);
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        router.push('/login');
    };

    const refreshToken = async () => {
        try {
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if (!refreshTokenValue) {
                throw new Error('No refresh token');
            }

            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: refreshTokenValue }),
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const data = await response.json();

            localStorage.setItem('accessToken', data.accessToken);
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken);
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        }
    };

    const redirectByRole = (role: string) => {
        switch (role) {
            case 'CLIENT':
                router.push('/dashboard/client');
                break;
            case 'LAWYER':
                router.push('/dashboard/lawyer');
                break;
            case 'ADMIN':
                router.push('/dashboard/admin');
                break;
            default:
                router.push('/dashboard');
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
