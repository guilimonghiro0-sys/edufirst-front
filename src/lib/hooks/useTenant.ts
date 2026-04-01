import { useEffect } from 'react';
import { useTenantStore } from '@/store/tenantStore';

export function useTenant() {
    const { setTenantId } = useTenantStore();

    useEffect(() => {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        if (parts.length >= 3 && !hostname.includes('localhost')) {
            const tenant = parts[0];
            setTenantId(tenant);
        } else {
            setTenantId(null);
        }
    }, [setTenantId]);
}