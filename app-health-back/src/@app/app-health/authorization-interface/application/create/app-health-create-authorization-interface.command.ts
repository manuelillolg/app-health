import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthCreateAuthorizationInterfaceCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            score: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
