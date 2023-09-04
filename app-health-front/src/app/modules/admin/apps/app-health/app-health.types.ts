export interface AppHealthApiInterfaceType {
    id: string;
    name: string;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApiInterfaceType {
    id: string;
    name: string;
    score: number;
}

export interface AppHealthUpdateApiInterfaceTypeById {
    id: string;
    name?: string;
    score?: number;
}

export interface AppHealthUpdateApiInterfaceTypes {
    id?: string;
    name?: string;
    score?: number;
}

export interface AppHealthTechnicalSolution {
    id: string;
    customerId: string;
    name: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateTechnicalSolution {
    id: string;
    customerId: string;
    name: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
}

export interface AppHealthUpdateTechnicalSolutionById {
    id: string;
    customerId?: string;
    name?: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
}

export interface AppHealthUpdateTechnicalSolutions {
    id?: string;
    customerId?: string;
    name?: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
}
