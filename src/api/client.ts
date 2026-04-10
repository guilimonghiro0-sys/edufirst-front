import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    withCredentials: true,
});

// Intercepteur pour ajouter le token
apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour rafraîchir le token si 401
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = useAuthStore.getState().refreshToken;
                const { data } = await apiClient.post('/auth/refresh', {
                    refreshToken,
                });
                useAuthStore.getState().setAuth(
                    useAuthStore.getState().user!,
                    data.access,
                    data.refresh,
                );
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return apiClient(originalRequest);
            } catch {
                useAuthStore.getState().logout();
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;