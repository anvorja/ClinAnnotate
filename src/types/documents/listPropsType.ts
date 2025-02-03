// src/types/documents/listPropsType.ts
import { DocumentPair } from './documents';

export interface DocumentListProps {
    documents: DocumentPair[];
    onViewAction?: (doc: DocumentPair) => Promise<void>;
    onDeleteAction?: (doc: DocumentPair) => Promise<void>;
    onConvertAction?: (doc: DocumentPair, format: 'json' | 'bio') => Promise<void>;
}