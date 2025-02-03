// Tipo básico para una etiqueta
export interface Label {
    id: number;
    name: string;
    description?: string;
    color?: string;
}

// Configuración de etiquetas
export interface LabelConfig {
    isCustom: boolean;  // true si son etiquetas personalizadas
    labels: Record<number, string>;  // mapeo id -> nombre
    source?: string;    // nombre del archivo de origen si es personalizado
}

// Estado de etiquetas
export interface LabelsState {
    config: LabelConfig;
    loadingLabels: boolean;
    error: string | null;
}

// Acciones para las etiquetas
export type LabelAction =
    | { type: 'SET_DEFAULT_LABELS' }
    | { type: 'SET_CUSTOM_LABELS'; payload: Record<number, string>; source: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };