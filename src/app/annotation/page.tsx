// src/app/annotation/page.tsx
'use client';

import { useState } from 'react';
import AnnotationLayout from '@/components/layout/AnnotationLayout';
import AnnotationContainer from '@/components/annotation/AnnotationContainer';
import AnnotationsSidebar from '@/components/annotation/AnnotationsSidebar';
import { EditEntityDialog } from '@/components/annotation/EditEntityDialog';
import { mockDocuments, mockLabels } from '@/data/annotation/AnnotationMockData';
import { Document, Entity } from '@/types/annotation/annotation';
import { useToast } from "@/hooks/use-toast";

export default function AnnotationPage() {
    const [currentDocument, setCurrentDocument] = useState<Document>(mockDocuments[0]);
    const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
    const { toast } = useToast();

    const handleDocumentUpdateAction = async (updatedDoc: Document) => {
        setCurrentDocument(updatedDoc);
    };

    const handleDeleteEntityAction = async (entityId: string) => {
        const updatedDoc = {
            ...currentDocument,
            entities: currentDocument.entities.filter(e => e.id !== entityId)
        };
        await handleDocumentUpdateAction(updatedDoc);

        toast({
            title: "Anotación eliminada",
            description: "La anotación ha sido eliminada exitosamente.",
        });
    };

    const handleEditEntityAction = async (entity: Entity) => {
        setEditingEntity(entity);
    };

    const handleSaveEdit = async (updatedEntity: Entity) => {
        const updatedDoc = {
            ...currentDocument,
            entities: currentDocument.entities.map(e =>
                e.id === updatedEntity.id ? updatedEntity : e
            )
        };
        await handleDocumentUpdateAction(updatedDoc);

        toast({
            title: "Anotación actualizada",
            description: "La anotación ha sido actualizada exitosamente.",
        });
    };

    return (
        <AnnotationLayout
            sidebarContent={
                <AnnotationsSidebar
                    entities={currentDocument.entities}
                    labels={mockLabels}
                    onDeleteEntityAction={handleDeleteEntityAction}
                    onEditEntityAction={handleEditEntityAction}
                />
            }
        >
            <div className="max-w-4xl mx-auto p-6">
                <div className="space-y-2 mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {currentDocument.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Seleccione texto para añadir anotaciones
                    </p>
                </div>

                <AnnotationContainer
                    document={currentDocument}
                    onUpdateDocumentAction={handleDocumentUpdateAction}
                />

                <EditEntityDialog
                    entity={editingEntity}
                    labels={mockLabels}
                    onClose={() => setEditingEntity(null)}
                    onSave={handleSaveEdit}
                />
            </div>
        </AnnotationLayout>
    );
}