// src/components/documents/DocumentList.tsx
'use client';

import React from 'react';
import {
    FileText,
    Code2,
    Database,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react';
import { DocumentPair } from '@/types/documents/documents';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface DocumentListProps {
    documents: DocumentPair[];
    onView?: (doc: DocumentPair) => void;
    onDelete?: (doc: DocumentPair) => void;
    onConvert?: (doc: DocumentPair, format: 'json' | 'bio') => void;
}

export function DocumentList({ documents, onView, onDelete, onConvert }: DocumentListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
                <Card key={doc.id} className="relative group">
                    <CardContent className="p-5">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-md bg-primary/10">
                                    <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm truncate max-w-[180px]">
                                        {doc.txtFile.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(doc.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onView?.(doc)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Ver documento
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onConvert?.(doc, 'json')}>
                                        <Code2 className="mr-2 h-4 w-4" />
                                        Convertir a JSON
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onConvert?.(doc, 'bio')}>
                                        <Database className="mr-2 h-4 w-4" />
                                        Convertir a BIO
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => onDelete?.(doc)}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Eliminar
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Status and Stats */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Badge variant={doc.status === 'annotated' ? 'default' : 'secondary'}
                                       className={doc.status === 'annotated' ? 'bg-green-500' : ''}>
                                    {doc.status === 'annotated' ? 'Anotado' : 'Pendiente'}
                                </Badge>
                                {doc.jsonFile && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge variant="outline">JSON</Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Convertido a JSON</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                                {doc.bioFile && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge variant="outline">BIO</Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Convertido a formato BIO</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>

                            {doc.stats && (
                                <div className="text-sm">
                                    <p className="text-muted-foreground">
                                        {doc.stats.totalAnnotations} anotaciones
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => onView?.(doc)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Abrir en el editor</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default DocumentList;