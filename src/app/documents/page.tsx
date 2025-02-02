// src/app/documents/page.tsx
'use client';

import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DocumentList from '@/components/documents/DocumentList';
import UploadDropzone from '@/components/documents/UploadDropzone';
import { DocumentPair } from '@/types/documents/documents';

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<DocumentPair[]>([]);

    const handleUpload = async (files: File[]) => {
        try {
            // Organizar archivos por pares
            const annFiles = files.filter(f => f.name.endsWith('.ann'));
            const txtFiles = files.filter(f => f.name.endsWith('.txt'));

            // Procesar cada par de archivos
            const processedDocs = await Promise.all(
                annFiles.map(async (annFile) => {
                    const baseName = annFile.name.replace('.ann', '');
                    const txtFile = txtFiles.find(f => f.name === `${baseName}.txt`);

                    if (!txtFile) return null;

                    try {
                        const [annContent, txtContent] = await Promise.all([
                            annFile.text(),
                            txtFile.text(),
                        ]);

                        const timestamp = Date.now();
                        const newDoc: DocumentPair = {
                            id: `doc_${timestamp}_${baseName}`,
                            annFile: {
                                id: `ann_${timestamp}`,
                                name: annFile.name,
                                type: 'ann',
                                content: annContent,
                            },
                            txtFile: {
                                id: `txt_${timestamp}`,
                                name: txtFile.name,
                                type: 'txt',
                                content: txtContent,
                            },
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            status: 'pending',
                            stats: {
                                totalAnnotations: annContent.split('\n').filter(line => line.trim()).length,
                                entityTypes: {},
                            },
                        };

                        return newDoc;
                    } catch (error) {
                        console.error(`Error procesando archivos ${baseName}:`, error);
                        return null;
                    }
                })
            );

            // Filtrar documentos nulos y actualizar el estado
            const validDocuments = processedDocs.filter((doc): doc is DocumentPair => doc !== null);

            setDocuments(prevDocs => [...prevDocs, ...validDocuments]);

        } catch (error) {
            console.error('Error al cargar los documentos:', error);
            // Aquí podrías mostrar un toast de error
        }
    };

    const handleView = async (doc: DocumentPair) => {
        // Implementar vista del documento
        console.log('Ver documento:', doc);
    };

    const handleDelete = async (doc: DocumentPair) => {
        setDocuments(prevDocs => prevDocs.filter(d => d.id !== doc.id));
    };

    const handleConvert = async (doc: DocumentPair, format: 'json' | 'bio') => {
        // Implementar conversión
        console.log(`Convertir documento ${doc.id} a formato ${format}`);
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Documentos</h1>
                    <p className="text-sm text-muted-foreground">
                        Gestiona tus archivos de anotación (.ann) y texto (.txt)
                    </p>
                </div>

                <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Cargar Archivos
                </Button>
            </div>

            {documents.length === 0 ? (
                <Card className="p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No hay documentos</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                            Comienza cargando archivos .ann y .txt para empezar a anotar tus documentos
                        </p>
                        <UploadDropzone onUploadAction={handleUpload} />
                    </div>
                </Card>
            ) : (
                <DocumentList
                    documents={documents}
                    onView={handleView}
                    onDelete={handleDelete}
                    onConvert={handleConvert}
                />
            )}
        </div>
    );
}