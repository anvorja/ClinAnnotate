'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirigir a la página de anotación por defecto
        router.push('/annotation');
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse">
                Redirigiendo...
            </div>
        </div>
    );
}