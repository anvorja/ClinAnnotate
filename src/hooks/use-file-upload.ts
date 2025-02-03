// // src/hooks/use-file-upload.ts
// import { useState } from 'react';
// import { DocumentPair} from '@/types/documents/documents';
//
// interface UseFileUploadReturn {
//     isUploading: boolean;
//     error: string | null;
//     uploadFiles: (files: File[]) => Promise<DocumentPair[]>;
//     reset: () => void;
// }
//
// export function useFileUpload(): UseFileUploadReturn {
//     const [isUploading, setIsUploading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//
//     const reset = () => {
//         setError(null);
//         setIsUploading(false);
//     };
//
//     const readFileContent = async (file: File): Promise<string> => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = (e) => resolve(e.target?.result as string);
//             reader.onerror = (e) => reject(e);
//             reader.readAsText(file);
//         });
//     };
//
//     const uploadFiles = async (files: File[]): Promise<DocumentPair[]> => {
//         try {
//             setIsUploading(true);
//             setError(null);
//
//             // Agrupar archivos por tipo
//             const annFiles = files.filter(f => f.name.endsWith('.ann'));
//             const txtFiles = files.filter(f => f.name.endsWith('.txt'));
//
//             // Validar que cada .ann tiene su .txt correspondiente
//             const pairs = annFiles.map(annFile => {
//                 const baseName = annFile.name.slice(0, -4); // remover '.ann'
//                 const txtFile = txtFiles.find(txt => txt.name === `${baseName}.txt`);
//                 return txtFile ? { annFile, txtFile } : null;
//             }).filter((pair): pair is { annFile: File; txtFile: File } => pair !== null);
//
//             if (pairs.length === 0) {
//                 throw new Error('No se encontraron pares válidos de archivos .ann y .txt');
//             }
//
//             // Procesar cada par de archivos
//             const documents = await Promise.all(pairs.map(async ({ annFile, txtFile }) => {
//                 const timestamp = Date.now();
//                 const baseName = annFile.name.slice(0, -4);
//
//                 try {
//                     const [annContent, txtContent] = await Promise.all([
//                         readFileContent(annFile),
//                         readFileContent(txtFile)
//                     ]);
//
//                     const document: DocumentPair = {
//                         id: `doc_${timestamp}_${baseName}`,
//                         annFile: {
//                             id: `ann_${timestamp}`,
//                             name: annFile.name,
//                             type: 'ann',
//                             content: annContent,
//                             pairedWith: `txt_${timestamp}`
//                         },
//                         txtFile: {
//                             id: `txt_${timestamp}`,
//                             name: txtFile.name,
//                             type: 'txt',
//                             content: txtContent,
//                             pairedWith: `ann_${timestamp}`
//                         },
//                         createdAt: new Date(),
//                         updatedAt: new Date(),
//                         status: 'pending',
//                         stats: {
//                             totalAnnotations: annContent.split('\n').filter(line => line.trim()).length,
//                             entityTypes: {}
//                         }
//                     };
//
//                     return document;
//                 } catch (err) {
//                     console.error(`Error procesando par de archivos ${baseName}:`, err);
//                     throw new Error(`Error al procesar los archivos ${baseName}`);
//                 }
//             }));
//
//             return documents;
//         } catch (err) {
//             const message = err instanceof Error ? err.message : 'Error al cargar los archivos';
//             setError(message);
//             throw err;
//         } finally {
//             setIsUploading(false);
//         }
//     };
//
//     return {
//         isUploading,
//         error,
//         uploadFiles,
//         reset
//     };
// }


import { useState } from 'react';
import { DocumentPair } from '@/types/documents/documents';

interface UseFileUploadReturn {
    isUploading: boolean;
    error: string | null;
    uploadFiles: (files: File[]) => Promise<DocumentPair[]>;
    reset: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setError(null);
        setIsUploading(false);
    };

    const readFileContent = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    };

    const uploadFiles = async (files: File[]): Promise<DocumentPair[]> => {
        setIsUploading(true);
        setError(null);

        try {
            // Agrupar archivos por tipo
            const annFiles = files.filter(f => f.name.endsWith('.ann'));
            const txtFiles = files.filter(f => f.name.endsWith('.txt'));

            // Validar que cada .ann tiene su .txt correspondiente
            const pairs = annFiles.map(annFile => {
                const baseName = annFile.name.slice(0, -4); // remover '.ann'
                const txtFile = txtFiles.find(txt => txt.name === `${baseName}.txt`);
                return txtFile ? { annFile, txtFile } : null;
            }).filter((pair): pair is { annFile: File; txtFile: File } => pair !== null);

            // Si no hay pares válidos, establecer el error y retornar array vacío
            if (pairs.length === 0) {
                setError('No se encontraron pares válidos de archivos .ann y .txt');
                return [];
            }

            // Procesar cada par de archivos y retornar directamente el resultado
            return await Promise.all(pairs.map(async ({ annFile, txtFile }) => {
                const timestamp = Date.now();
                const baseName = annFile.name.slice(0, -4);

                const [annContent, txtContent] = await Promise.all([
                    readFileContent(annFile),
                    readFileContent(txtFile)
                ]);

                return {
                    id: `doc_${timestamp}_${baseName}`,
                    annFile: {
                        id: `ann_${timestamp}`,
                        name: annFile.name,
                        type: 'ann',
                        content: annContent,
                        pairedWith: `txt_${timestamp}`
                    },
                    txtFile: {
                        id: `txt_${timestamp}`,
                        name: txtFile.name,
                        type: 'txt',
                        content: txtContent,
                        pairedWith: `ann_${timestamp}`
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status: 'pending',
                    stats: {
                        totalAnnotations: annContent.split('\n').filter(line => line.trim()).length,
                        entityTypes: {}
                    }
                };
            }));
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al cargar los archivos';
            setError(message);
            return []; // Retornamos un array vacío en caso de error
        } finally {
            setIsUploading(false);
        }
    };

    return {
        isUploading,
        error,
        uploadFiles,
        reset
    };
}