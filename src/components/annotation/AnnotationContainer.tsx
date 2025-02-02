// src/components/annotation/AnnotationContainer.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Document } from '@/types/annotation/annotation';
import { mockLabels } from '@/data/annotation/AnnotationMockData';
import TextViewer from './TextViewer';
import LabelPopover from './LabelPopover';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2 } from 'lucide-react';

interface AnnotationContainerProps {
    document: Document;
    onUpdateDocumentAction: (updatedDoc: Document) => Promise<void>;
}

export const AnnotationContainer: React.FC<AnnotationContainerProps> = ({
                                                                            document,
                                                                            onUpdateDocumentAction,
                                                                        }) => {
    const [selectedText, setSelectedText] = useState('');
    const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
    const [history, setHistory] = useState<Document[]>([document]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const addToHistory = useCallback(async (newDoc: Document) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newDoc);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        await onUpdateDocumentAction(newDoc);
    }, [history, historyIndex, onUpdateDocumentAction]);

    const handleTextSelect = useCallback(async (_: number, __: number, text: string): Promise<void> => {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText(text);
        setSelectionPosition({
            x: rect.left + (rect.width / 2) + window.scrollX,
            y: rect.top + window.scrollY
        });
    }, []);

    const handleLabelSelect = useCallback(async (labelId: string) => {
        const newEntity = {
            id: `e${Date.now()}`,
            start: document.text.indexOf(selectedText),
            end: document.text.indexOf(selectedText) + selectedText.length,
            text: selectedText,
            type: labelId,
        };

        const newDoc = {
            ...document,
            entities: [...document.entities, newEntity],
        };

        await addToHistory(newDoc);
        setSelectionPosition(null);
        setSelectedText('');
    }, [document, selectedText, addToHistory]);

    const handleUndo = useCallback(async () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            await onUpdateDocumentAction(history[historyIndex - 1]);
        }
    }, [history, historyIndex, onUpdateDocumentAction]);

    const handleRedo = useCallback(async () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            await onUpdateDocumentAction(history[historyIndex + 1]);
        }
    }, [history, historyIndex, onUpdateDocumentAction]);

    return (
        <div className="relative">
            {/* Toolbar */}
            <div className="mb-4 flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleUndo}
                    disabled={historyIndex === 0}
                >
                    <Undo2 className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRedo}
                    disabled={historyIndex === history.length - 1}
                >
                    <Redo2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Text Viewer */}
            <TextViewer
                text={document.text}
                entities={document.entities}
                labels={mockLabels}
                onTextSelectAction={handleTextSelect}
            />

            {/* Label Popover */}
            <LabelPopover
                labels={mockLabels}
                selectedText={selectedText}
                position={selectionPosition}
                onLabelSelectAction={handleLabelSelect}
                onCloseAction={async () => setSelectionPosition(null)}
            />
        </div>
    );
};

export default AnnotationContainer;