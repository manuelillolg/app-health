import { CQMetadata } from '@aurorajs.dev/core';

export class  AppHealthCreateAuthorizationInterfacesCommand
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
