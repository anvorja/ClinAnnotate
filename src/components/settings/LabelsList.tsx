'use client';

import React from 'react';
import { useLabelsStore } from '@/store/labels';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export function LabelsList() {
    const { config } = useLabelsStore();
    const [searchTerm, setSearchTerm] = React.useState('');

    // Filtrar etiquetas basadas en la búsqueda
    const filteredLabels = Object.entries(config.labels)
        .filter(([id, name]) =>
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            id.includes(searchTerm)
        )
        .sort((a, b) => Number(a[0]) - Number(b[0]));

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar etiquetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Prefijo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLabels.map(([id, name]) => {
                            const [prefix, ...rest] = name.split('_');
                            const type = rest.join('_');
                            return (
                                <TableRow key={id}>
                                    <TableCell className="font-mono">{id}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{type}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            prefix === 'B' ? 'bg-blue-100 text-blue-800' :
                                                prefix === 'I' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                            {prefix}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default LabelsList;