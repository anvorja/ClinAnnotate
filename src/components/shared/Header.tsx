// src/components/shared/Header.tsx
'use client'

import {ModeToggle} from "@/components/shared/ModeToggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur h-14">
            <div className="flex h-full items-center justify-between px-4 sm:px-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-lg font-semibold">Clinical Tag - Annotation Tool</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header