// src/components/annotation/TextViewer.tsx
'use client';

import React, {useCallback, useRef, useEffect, JSX} from 'react';
import { Card } from '@/components/ui/card';
import { Entity, Label } from '@/types/annotation/annotation';

interface TextViewerProps {
    text: string;
    entities: Entity[];
    labels: Label[];
    onTextSelectAction: (start: number, end: number, text: string) => Promise<void>;
}

export const TextViewer: React.FC<TextViewerProps> = ({
                                                          text,
                                                          entities,
                                                          labels,
                                                          onTextSelectAction,
                                                      }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Ordena las entidades por posición de inicio para renderizarlas correctamente
    const sortedEntities = [...entities].sort((a, b) => a.start - b.start);

    // Función para obtener el color de una etiqueta
    const getLabelColor = useCallback((type: string) => {
        const label = labels.find(l => l.id === type);
        return label?.color || '#cccccc';
    }, [labels]);

    // Construye el texto con las anotaciones
    const renderText = useCallback(() => {
        let lastIndex = 0;
        const elements: JSX.Element[] = [];

        sortedEntities.forEach((entity) => {
            // Añade el texto antes de la entidad
            if (entity.start > lastIndex) {
                elements.push(
                    <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
                        {text.slice(lastIndex, entity.start)}
                    </span>
                );
            }

            // Añade la entidad resaltada
            elements.push(
                <mark
                    key={entity.id}
                    className="rounded px-1 cursor-pointer"
                    style={{ backgroundColor: `${getLabelColor(entity.type)}40` }}
                    title={`Type: ${entity.type}`}
                >
                    {text.slice(entity.start, entity.end)}
                </mark>
            );

            lastIndex = entity.end;
        });

        // Añade el texto restante después de la última entidad
        if (lastIndex < text.length) {
            elements.push(
                <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
                    {text.slice(lastIndex)}
                </span>
            );
        }

        return elements;
    }, [text, sortedEntities, getLabelColor]);

    // Maneja la selección de texto
    const handleSelection = useCallback(async () => {
        const selection = window.getSelection();
        if (!selection || !containerRef.current) return;

        const range = selection.getRangeAt(0);
        const containerElement = containerRef.current;

        // Calcula las posiciones relativas al contenedor
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerElement);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const start = preSelectionRange.toString().length;

        const selectedText = selection.toString().trim();
        if (selectedText) {
            await onTextSelectAction(start, start + selectedText.length, selectedText);
        }
    }, [onTextSelectAction]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('mouseup', handleSelection);
        return () => {
            container.removeEventListener('mouseup', handleSelection);
        };
    }, [handleSelection]);

    return (
        <Card className="p-6 relative">
            <div
                ref={containerRef}
                className="text-lg leading-relaxed select-text cursor-text"
            >
                {renderText()}
            </div>
        </Card>
    );
};

export default TextViewer;