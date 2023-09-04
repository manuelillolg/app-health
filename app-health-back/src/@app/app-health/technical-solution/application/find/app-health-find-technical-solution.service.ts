import { AppHealthITechnicalSolutionRepository, AppHealthTechnicalSolution } from '@app/app-health/technical-solution';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindTechnicalSolutionService
{
    constructor(
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
