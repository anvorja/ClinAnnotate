'use client';

import React from 'react';
import { Entity, Label } from '@/types/annotation/annotation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface EditEntityDialogProps {
    entity: Entity | null;
    labels: Label[];
    onClose: () => void;
    onSave: (updatedEntity: Entity) => Promise<void>;
}

export function EditEntityDialog({
                                     entity,
                                     labels,
                                     onClose,
                                     onSave
                                 }: EditEntityDialogProps) {
    const [selectedLabel, setSelectedLabel] = React.useState(entity?.type || '');

    const handleSave = async () => {
        if (!entity) return;

        await onSave({
            ...entity,
            type: selectedLabel
        });
        onClose();
    };

    React.useEffect(() => {
        if (entity) {
            setSelectedLabel(entity.type);
        }
    }, [entity]);

    if (!entity) return null;

    return (
        <Dialog open={!!entity} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Anotación</DialogTitle>
                    <DialogDescription>
                        Modifica la etiqueta para el texto seleccionado.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Texto seleccionado</h4>
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                            {entity.text}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Etiqueta
                            </label>
                            <Select
                                value={selectedLabel}
                                onValueChange={setSelectedLabel}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una etiqueta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {labels.map((label) => (
                                            <SelectItem
                                                key={label.id}
                                                value={label.id}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{
                                                            backgroundColor: label.color
                                                        }}
                                                    />
                                                    {label.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                        Guardar cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}