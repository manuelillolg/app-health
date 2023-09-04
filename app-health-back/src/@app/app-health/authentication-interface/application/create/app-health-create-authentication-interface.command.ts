import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthCreateAuthenticationInterfaceCommand
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
