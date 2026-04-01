import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
    role: 'admin' | 'teacher' | 'parent' | 'student';
    school_id: number;
    // autres champs selon ton backend
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    setAuth: (user: User, access: string, refresh: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            setAuth: (user, access, refresh) => set({ user, accessToken: access, refreshToken: refresh }),
            logout: () => set({ user: null, accessToken: null, refreshToken: null }),
        }),
        { name: 'auth-storage' } // sauvegarde dans localStorage
    )
);