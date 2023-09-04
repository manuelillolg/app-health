import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolution } from '../../domain/app-health-technical-solution.aggregate';
import { AppHealthTechnicalSolutionId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindTechnicalSolutionByIdService
{
    constructor(
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        id: AppHealthTechnicalSolutionId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
