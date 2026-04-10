import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
    role: 'admin' | 'teacher' | 'student' | 'parent';
    first_name: string;
    last_name: string;
    gender?: string;
    phone?: string;
    province?: string;
    address?: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    setAuth: (user: User, access: string, refresh: string) => void;
    setAccessToken: (access: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            setAuth: (user, access, refresh) => set({ user, accessToken: access, refreshToken: refresh }),
            setAccessToken: (access) => set({ accessToken: access }),
            logout: () => set({ user: null, accessToken: null, refreshToken: null }),
        }),
        { name: 'auth-storage' }
    )
);