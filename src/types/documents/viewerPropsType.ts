import {DocumentPair} from "@/types/documents/documents";

export interface DocumentViewerProps {
    document: DocumentPair;
    onCloseAction: () => void;
}