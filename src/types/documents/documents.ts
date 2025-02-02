// src/types/documents/documents.ts

// Definición de tipos de archivos permitidos
export type FileType = 'ann' | 'txt' | 'json' | 'bio';

// Interfaz base para archivos
export interface DocumentFile {
    id: string;
    name: string;
    type: FileType;
    content: string;
    pairedWith?: string; // id del archivo relacionado
    convertedTo?: string[]; // id de las conversiones
}

// Interfaces específicas para cada tipo de archivo
export interface AnnFile extends Omit<DocumentFile, 'type'> {
    type: 'ann';
}

export interface TxtFile extends Omit<DocumentFile, 'type'> {
    type: 'txt';
}

export interface JsonFile extends Omit<DocumentFile, 'type'> {
    type: 'json';
}

export interface BioFile extends Omit<DocumentFile, 'type'> {
    type: 'bio';
}

// Interfaz para el par de documentos
export interface DocumentPair {
    id: string;
    annFile: AnnFile;
    txtFile: TxtFile;
    jsonFile?: JsonFile;
    bioFile?: BioFile;
    createdAt: Date;
    updatedAt: Date;
    status: 'pending' | 'annotated' | 'converted';
    stats?: {
        totalAnnotations: number;
        entityTypes: Record<string, number>;
    };
}

// Estado global para la gestión de documentos
export interface DocumentsState {
    documents: DocumentPair[];
    selectedDocument?: string;
    isConverting: boolean;
    error?: string;
}