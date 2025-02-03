import { DocumentPair } from './documents';

export interface UploadDropzoneProps {
    onUploadAction: (documents: DocumentPair[]) => Promise<void>;
}