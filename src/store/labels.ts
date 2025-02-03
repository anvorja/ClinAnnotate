// src/store/labels.ts
import { create } from 'zustand';
import { defaultLabels } from '@/data/labels/defaultLabels';
import { LabelsState } from '@/types/labels/labels';

interface ParseResult {
    success: boolean;
    data?: Record<number, string>;
    error?: string;
}

interface LabelsStore extends LabelsState {
    setDefaultLabels: () => void;
    setCustomLabels: (labels: Record<number, string>, source: string) => void;
    parseLabelsFile: (content: string) => Promise<ParseResult>;
    resetLabels: () => void;
}

export const useLabelsStore = create<LabelsStore>((set) => ({
    config: {
        isCustom: false,
        labels: defaultLabels,
    },
    loadingLabels: false,
    error: null,

    setDefaultLabels: () => {
        set({
            config: {
                isCustom: false,
                labels: defaultLabels,
            },
            error: null,
        });
    },

    setCustomLabels: (labels, source) => {
        set({
            config: {
                isCustom: true,
                labels,
                source,
            },
            error: null,
        });
    },

    parseLabelsFile: async (content: string): Promise<ParseResult> => {
        try {
            // Asumimos que el archivo viene en formato similar a labels_enumerate.txt
            const cleanContent = content
                .replace('labels = {', '{')
                .replace(/'/g, '"')
                .replace(/\s+/g, ' ');

            const labelsObj = JSON.parse(cleanContent);

            // Validar formato
            const isValid = Object.entries(labelsObj).every(
                ([key, value]) =>
                    !isNaN(Number(key)) &&
                    typeof value === 'string' &&
                    value.length > 0
            );

            if (!isValid) {
                return {
                    success: false,
                    error: 'Formato de archivo inválido'
                };
            }

            return {
                success: true,
                data: labelsObj
            };
        } catch {
            return {
                success: false,
                error: 'Error al parsear el archivo de etiquetas'
            };
        }
    },

    resetLabels: () => {
        set({
            config: {
                isCustom: false,
                labels: defaultLabels,
            },
            loadingLabels: false,
            error: null,
        });
    },
}));