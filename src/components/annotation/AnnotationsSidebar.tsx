// // // src/components/annotation/AnnotationsSidebar.tsx
//
//
// 'use client';
//
// import React from 'react';
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { Edit2, Trash2, AlertCircle } from 'lucide-react';
// import { Entity, Label } from '@/types/annotation/annotation';
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
//
// interface AnnotationsSidebarProps {
//     entities: Entity[];
//     labels: Label[];
//     onDeleteEntityAction: (entityId: string) => Promise<void>;
//     onEditEntityAction: (entity: Entity) => Promise<void>;
// }
//
// export const AnnotationsSidebar: React.FC<AnnotationsSidebarProps> = ({
//                                                                           entities,
//                                                                           labels,
//                                                                           onDeleteEntityAction,
//                                                                           onEditEntityAction,
//                                                                       }) => {
//     const sortedEntities = [...entities].sort((a, b) => a.start - b.start);
//     const getLabelInfo = (type: string) => labels.find(l => l.id === type);
//
//     return (
//         <div className="h-full flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b">
//                 <div className="flex items-center justify-between mb-1">
//                     <h2 className="text-lg font-semibold">Anotaciones</h2>
//                     <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <AlertCircle className="h-4 w-4 text-muted-foreground" />
//                             </TooltipTrigger>
//                             <TooltipContent>
//                                 <p>Lista de todas las anotaciones en el documento actual</p>
//                             </TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                     {entities.length} anotaciones encontradas
//                 </p>
//             </div>
//
//             {/* Annotations list */}
//             <ScrollArea className="flex-1 p-4">
//                 <div className="space-y-3">
//                     {sortedEntities.map((entity) => {
//                         const labelInfo = getLabelInfo(entity.type);
//                         return (
//                             <div
//                                 key={entity.id}
//                                 className="group relative p-3 rounded-lg bg-background hover:bg-accent/50 transition-colors"
//                             >
//                                 <div className="flex items-center justify-between mb-2">
//                                     <div className="flex items-center gap-2">
//                                         <div
//                                             className="w-3 h-3 rounded-full"
//                                             style={{ backgroundColor: labelInfo?.color }}
//                                         />
//                                         <span className="text-sm font-medium">
//                                             {labelInfo?.name}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                         <TooltipProvider>
//                                             <Tooltip>
//                                                 <TooltipTrigger asChild>
//                                                     <Button
//                                                         variant="ghost"
//                                                         size="icon"
//                                                         className="h-7 w-7"
//                                                         onClick={() => onEditEntityAction(entity)}
//                                                     >
//                                                         <Edit2 className="h-3.5 w-3.5" />
//                                                     </Button>
//                                                 </TooltipTrigger>
//                                                 <TooltipContent>
//                                                     <p>Editar anotación</p>
//                                                 </TooltipContent>
//                                             </Tooltip>
//                                         </TooltipProvider>
//
//                                         <TooltipProvider>
//                                             <Tooltip>
//                                                 <TooltipTrigger asChild>
//                                                     <Button
//                                                         variant="ghost"
//                                                         size="icon"
//                                                         className="h-7 w-7 text-destructive hover:text-destructive"
//                                                         onClick={() => onDeleteEntityAction(entity.id)}
//                                                     >
//                                                         <Trash2 className="h-3.5 w-3.5" />
//                                                     </Button>
//                                                 </TooltipTrigger>
//                                                 <TooltipContent>
//                                                     <p>Eliminar anotación</p>
//                                                 </TooltipContent>
//                                             </Tooltip>
//                                         </TooltipProvider>
//                                     </div>
//                                 </div>
//
//                                 <p className="text-sm text-muted-foreground">
//                                     &ldquo;{entity.text}&rdquo;
//                                 </p>
//                                 <p className="text-xs text-muted-foreground mt-1">
//                                     Posición: {entity.start}-{entity.end}
//                                 </p>
//                             </div>
//                         );
//                     })}
//
//                     {entities.length === 0 && (
//                         <div className="text-center text-muted-foreground py-8">
//                             No hay anotaciones aún.
//                             <br />
//                             Selecciona texto en el documento para comenzar.
//                         </div>
//                     )}
//                 </div>
//             </ScrollArea>
//         </div>
//     );
// };
//
// export default AnnotationsSidebar;


'use client';

import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, HelpCircle } from 'lucide-react';
import { Entity, Label } from '@/types/annotation/annotation';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnnotationsSidebarProps {
    entities: Entity[];
    labels: Label[];
    onDeleteEntityAction: (entityId: string) => Promise<void>;
    onEditEntityAction: (entity: Entity) => Promise<void>;
}

export const AnnotationsSidebar: React.FC<AnnotationsSidebarProps> = ({
                                                                          entities,
                                                                          labels,
                                                                          onDeleteEntityAction,
                                                                          onEditEntityAction,
                                                                      }) => {
    const sortedEntities = [...entities].sort((a, b) => a.start - b.start);
    const getLabelInfo = (type: string) => labels.find(l => l.id === type);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Anotaciones</span>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground/70" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-sm">Lista de anotaciones en el documento</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <span className="text-xs text-muted-foreground">
                    {entities.length} encontradas
                </span>
            </div>

            {/* Annotations list */}
            <ScrollArea className="flex-1">
                <div className="px-3 py-2">
                    {sortedEntities.length > 0 ? (
                        <div className="space-y-2">
                            {sortedEntities.map((entity) => {
                                const labelInfo = getLabelInfo(entity.type);
                                return (
                                    <div
                                        key={entity.id}
                                        className="group p-2 rounded hover:bg-accent/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full shrink-0"
                                                style={{ backgroundColor: labelInfo?.color }}
                                            />
                                            <span className="text-sm font-medium">
                                                {labelInfo?.name}
                                            </span>
                                            <div className="ml-auto flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => onEditEntityAction(entity)}
                                                >
                                                    <Pencil className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => onDeleteEntityAction(entity.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1 pl-4">
                                            &ldquo;{entity.text}&rdquo;
                                        </p>
                                        <p className="text-xs text-muted-foreground/70 mt-1 pl-4">
                                            Posición: {entity.start}-{entity.end}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                            No hay anotaciones aún
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default AnnotationsSidebar;