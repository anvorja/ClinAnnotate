// src/app/settings/page.tsx
'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabelsConfig } from '@/components/settings/LabelsConfig';
import { LabelsList } from '@/components/settings/LabelsList';

export default function SettingsPage() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Configuración</h1>
                <p className="text-sm text-muted-foreground">
                    Gestiona la configuración de tu herramienta de anotación
                </p>
            </div>

            <Tabs defaultValue="labels" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="labels">Etiquetas</TabsTrigger>
                    {/* Aquí podrían ir más pestañas de configuración */}
                </TabsList>
                <TabsContent value="labels" className="space-y-6">
                    <LabelsConfig />
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Lista de Etiquetas</h3>
                        <LabelsList />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}