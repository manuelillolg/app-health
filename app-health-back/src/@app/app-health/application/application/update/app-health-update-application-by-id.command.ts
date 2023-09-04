import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            technicalSolutionId?: string;
            name?: string;
            description?: string;
            businessImpact?: string;
            type?: string;
            releaseDate?: string;
            architectureDiagram?: string;
            hasTenants?: boolean;
            hasLicensing?: boolean;
            costLicensesPerYear?: number;
            requestsPerDay?: number;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
