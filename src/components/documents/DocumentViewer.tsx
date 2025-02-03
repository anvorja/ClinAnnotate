// src/components/documents/DocumentViewer.tsx
'use client';

import React from 'react';
import { FileText, Code2, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {DocumentViewerProps} from "@/types/documents/viewerPropsType";

export function DocumentViewer({ document, onCloseAction }: DocumentViewerProps) {
    return (
        <Card className="w-full max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-semibold">{document.txtFile.name}</h2>
                    <p className="text-sm text-muted-foreground">
                        Última modificación: {new Date(document.updatedAt).toLocaleString()}
                    </p>
                </div>
                <Button variant="outline" onClick={onCloseAction}>
                    Cerrar
                </Button>
            </div>

            <Tabs defaultValue="text" className="w-full">
                <TabsList>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Texto (.txt)
                    </TabsTrigger>
                    <TabsTrigger value="annotations" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Anotaciones (.ann)
                    </TabsTrigger>
                    {document.jsonFile && (
                        <TabsTrigger value="json" className="flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            JSON
                        </TabsTrigger>
                    )}
                    {document.bioFile && (
                        <TabsTrigger value="bio" className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            BIO
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="text" className="mt-4">
                    <Card>
                        <pre className="p-4 text-sm overflow-auto max-h-[500px] whitespace-pre-wrap">
                            {document.txtFile.content}
                        </pre>
                    </Card>
                </TabsContent>

                <TabsContent value="annotations" className="mt-4">
                    <Card>
                        <pre className="p-4 text-sm overflow-auto max-h-[500px] whitespace-pre-wrap">
                            {document.annFile.content}
                        </pre>
                    </Card>
                </TabsContent>

                {document.jsonFile && (
                    <TabsContent value="json" className="mt-4">
                        <Card>
                            <pre className="p-4 text-sm overflow-auto max-h-[500px] whitespace-pre-wrap">
                                {JSON.stringify(JSON.parse(document.jsonFile.content), null, 2)}
                            </pre>
                        </Card>
                    </TabsContent>
                )}

                {document.bioFile && (
                    <TabsContent value="bio" className="mt-4">
                        <Card>
                            <pre className="p-4 text-sm overflow-auto max-h-[500px] whitespace-pre-wrap">
                                {document.bioFile.content}
                            </pre>
                        </Card>
                    </TabsContent>
                )}
            </Tabs>
        </Card>
    );
}

export default DocumentViewer;