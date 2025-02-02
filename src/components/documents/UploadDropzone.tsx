// src/components/documents/UploadDropzone.tsx
'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadDropzoneProps {
    onUploadAction: (files: File[]) => Promise<void>;
}

export function UploadDropzone({ onUploadAction }: UploadDropzoneProps) {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Validar pares de archivos .ann y .txt
        const annFiles = acceptedFiles.filter(file => file.name.endsWith('.ann'));
        const txtFiles = acceptedFiles.filter(file => file.name.endsWith('.txt'));

        // Verificar que cada .ann tiene su .txt correspondiente
        const validPairs = annFiles.filter(annFile => {
            const baseName = annFile.name.replace('.ann', '');
            return txtFiles.some(txtFile => txtFile.name === `${baseName}.txt`);
        });

        if (validPairs.length !== annFiles.length) {
            alert('Algunos archivos .ann no tienen su correspondiente archivo .txt');
            return;
        }

        await onUploadAction(acceptedFiles);
    }, [onUploadAction]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/plain': ['.txt', '.ann']
        },
        multiple: true
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-lg p-12 transition-colors cursor-pointer",
                "hover:bg-accent/50",
                isDragActive ? "border-primary bg-accent" : "border-muted-foreground/25"
            )}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center text-center">
                <UploadCloud className="h-8 w-8 mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                    Arrastra y suelta archivos aquí, o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground">
                    Asegúrate de incluir los archivos .ann y .txt correspondientes
                </p>
            </div>
        </div>
    );
}

export default UploadDropzone;