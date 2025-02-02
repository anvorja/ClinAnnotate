import { Document, Label, ProjectConfig } from '@/types/annotation/annotation';

export const mockLabels: Label[] = [
    {
        id: 'cancer_type',
        name: 'Cancer Type',
        description: 'Tipo específico de cáncer mencionado',
        color: '#FF5733'
    },
    {
        id: 'body_part',
        name: 'Body Part',
        description: 'Parte del cuerpo afectada',
        color: '#33FF57'
    },
    {
        id: 'symptom',
        name: 'Symptom',
        description: 'Síntomas reportados',
        color: '#3357FF'
    },
    {
        id: 'treatment',
        name: 'Treatment',
        description: 'Tratamientos mencionados',
        color: '#FF33F6'
    },
    {
        id: 'stage',
        name: 'Stage',
        description: 'Etapa o estadio del cáncer',
        color: '#33FFF6'
    }
];

export const mockDocuments: Document[] = [
    {
        id: 'doc1',
        name: 'caso_clinico_1.txt',
        text: 'Paciente diagnosticado con cáncer de pulmón en etapa temprana. Presenta tos persistente y dolor en el pecho. Se recomienda iniciar quimioterapia.',
        entities: [
            {
                id: 'e1',
                start: 24,
                end: 40,
                text: 'cáncer de pulmón',
                type: 'cancer_type'
            },
            {
                id: 'e2',
                start: 44,
                end: 58,
                text: 'etapa temprana',
                type: 'stage'
            }
        ]
    },
    {
        id: 'doc2',
        name: 'caso_clinico_2.txt',
        text: 'Melanoma maligno detectado en la espalda superior. El paciente reporta cambios en un lunar existente. Se planea extirpación quirúrgica.',
        entities: []
    }
];

export const mockConfig: ProjectConfig = {
    name: 'Proyecto de Anotación de Casos de Cáncer',
    description: 'Proyecto para anotar casos clínicos relacionados con diferentes tipos de cáncer',
    labels: mockLabels,
    enableSuggestions: true,
    suggestionSources: ['huggingface', 'mistral']
};