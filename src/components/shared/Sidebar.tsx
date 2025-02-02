// src/components/shared/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    FileText,
    Tags,
    Settings,
    Download,
    Lightbulb
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const navigationItems = [
    {
        name: 'Documentos',
        href: '/documents',
        icon: FileText
    },
    {
        name: 'Anotación',
        href: '/annotation',
        icon: Tags
    },
    {
        name: 'Sugerencias',
        href: '/suggestions',
        icon: Lightbulb
    },
    {
        name: 'Exportar',
        href: '/export',
        icon: Download
    },
    {
        name: 'Configuración',
        href: '/settings',
        icon: Settings
    }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-16 border-r bg-card">
            <div className="flex flex-col items-center py-4">
                {/* Logo o título */}
                <div className="mb-8 px-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <span className="text-lg font-bold text-primary">B</span>
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Inicio</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {/* Navegación principal */}
                <nav className="flex-1 flex flex-col items-center gap-4">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <TooltipProvider key={item.href}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative group",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {isActive && (
                                                <div className="absolute left-0 w-1 inset-y-1 bg-primary rounded-full -translate-x-2" />
                                            )}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>{item.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;