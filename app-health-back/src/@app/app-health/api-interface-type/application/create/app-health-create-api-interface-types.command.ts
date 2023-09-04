import { CQMetadata } from '@aurorajs.dev/core';

export class  AppHealthCreateApiInterfaceTypesCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            score: number;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
