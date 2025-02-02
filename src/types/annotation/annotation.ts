// src/types/annotation.ts
// Interfaz para una entidad anotada
export interface Entity {
    id: string;
    start: number;
    end: number;
    text: string;
    type: string;
    color?: string;
}

// Interfaz para un documento de texto
export interface Document {
    id: string;
    name: string;
    text: string;
    entities: Entity[];
}

// Interfaz para una etiqueta disponible
export interface Label {
    id: string;
    name: string;
    description: string;
    color: string;
}

// Interfaz para el estado de la anotación
export interface AnnotationState {
    selectedText: string;
    startIndex: number;
    endIndex: number;
    selectedLabel: string | null;
}

// Interfaz para las sugerencias de etiquetado
export interface LabelSuggestion {
    id: string;
    text: string;
    suggestedLabel: string;
    confidence: number;
    source: 'huggingface' | 'mistral';
}

// Interfaz para la configuración del proyecto
export interface ProjectConfig {
    name: string;
    description: string;
    labels: Label[];
    enableSuggestions: boolean;
    suggestionSources: ('huggingface' | 'mistral')[];
}