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
