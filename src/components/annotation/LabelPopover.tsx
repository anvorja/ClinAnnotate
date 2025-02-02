// src/components/annotation/LabelPopover.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/types/annotation/annotation';
import { cn } from '@/lib/utils';

interface LabelPopoverProps {
    labels: Label[];
    selectedText: string;
    position: { x: number; y: number } | null;
    onLabelSelectAction: (labelId: string) => Promise<void>;
    onCloseAction: () => Promise<void>;
}

export const LabelPopover: React.FC<LabelPopoverProps> = ({
                                                              labels,
                                                              selectedText,
                                                              position,
                                                              onLabelSelectAction,
                                                              onCloseAction,
                                                          }) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (position && popoverRef.current) {
            // Altura del header (56px) + margen de seguridad (16px)
            const minTopOffset = 72;

            // Obtener dimensiones de la ventana y el popover
            const windowHeight = window.innerHeight;
            const popoverHeight = popoverRef.current.offsetHeight;

            // Calcular posición Y ajustada
            let adjustedY = position.y;

            // Ajustar si está muy arriba
            if (adjustedY < minTopOffset) {
                adjustedY = minTopOffset;
            }

            // Ajustar si está muy abajo
            if (adjustedY + popoverHeight > windowHeight) {
                adjustedY = windowHeight - popoverHeight - 20; // 20px margen inferior
            }

            // Aplicar posición
            popoverRef.current.style.top = `${adjustedY}px`;
            popoverRef.current.style.left = `${position.x}px`;
        }
    }, [position]);

    if (!position) return null;

    return (
        <Card
            ref={popoverRef}
            className={cn(
                "fixed z-50 w-72 shadow-lg",
                "animate-in fade-in-0 zoom-in-95 duration-200"
            )}
            style={{
                transform: 'translate(-50%, 0)',
                visibility: position ? 'visible' : 'hidden'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
                <h3 className="text-sm font-medium">Seleccionar Etiqueta</h3>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    onClick={onCloseAction}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Selected text preview */}
            <div className="px-4 py-2 border-b bg-muted/20">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    &ldquo;{selectedText}&rdquo;
                </p>
            </div>

            {/* Label options */}
            <div className="max-h-[300px] overflow-y-auto">
                <div className="p-2 space-y-1">
                    {labels.map((label) => (
                        <button
                            key={label.id}
                            onClick={() => onLabelSelectAction(label.id)}
                            className={cn(
                                "w-full px-3 py-2 rounded-md text-left",
                                "flex items-center gap-2",
                                "hover:bg-accent transition-colors",
                                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                            )}
                        >
                            <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: label.color }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium">
                                    {label.name}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                    {label.description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default LabelPopover;