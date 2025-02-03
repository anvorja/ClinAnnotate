// src/components/settings/LabelsConfig.tsx
'use client';

import React from 'react';
import { useLabelsStore } from '@/store/labels';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle } from 'lucide-react';
import {useToast} from "@/hooks/use-toast";


export function LabelsConfig() {
    const { config, parseLabelsFile, setCustomLabels, setDefaultLabels } = useLabelsStore();
    const { toast } = useToast();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const content = await file.text();
            const result = await parseLabelsFile(content);

            if (result.success && result.data) {
                setCustomLabels(result.data, file.name);
                toast({
                    title: "Etiquetas cargadas",
                    description: `Se han cargado ${Object.keys(result.data).length} etiquetas desde ${file.name}`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error al cargar etiquetas",
                    description: result.error,
                });
            }
        } catch {
            toast({
                variant: "destructive",
                title: "Error al leer archivo",
                description: "No se pudo leer el contenido del archivo",
            });
        }

        // Limpiar input para permitir cargar el mismo archivo
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight">Configuración de Etiquetas</h2>
                    <p className="text-sm text-muted-foreground">
                        Gestiona las etiquetas disponibles para anotación
                    </p>
                </div>
            </div>

            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Etiquetas Actuales</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Usando:</span>
                            <span className="font-medium text-foreground">
                                {config.isCustom ? config.source : 'Etiquetas predeterminadas'}
                            </span>
                            ({Object.keys(config.labels).length} etiquetas)
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h4 className="text-sm font-medium mb-2">Cargar etiquetas personalizadas</h4>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Seleccionar archivo
                                </Button>
                                {config.isCustom && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setDefaultLabels();
                                            toast({
                                                title: "Etiquetas restauradas",
                                                description: "Se han restaurado las etiquetas predeterminadas",
                                            });
                                        }}
                                    >
                                        Restaurar predeterminadas
                                    </Button>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".txt"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>

                        <Alert>
                            <div className="flex gap-2">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <AlertDescription>
                                    Debe ser un archivo plano (.txt) que contenga la definición de etiquetas con el formato:<br/>
                                    <code className="bg-muted px-2 py-1 rounded mt-1 block font-mono text-sm">
                                        labels = {"{"}
                                        0: &quot;B_AGE&quot;,
                                        1: &quot;B_STAGE&quot;,
                                        # ...
                                        {"}"}
                                    </code>
                                </AlertDescription>
                            </div>
                        </Alert>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default LabelsConfig;