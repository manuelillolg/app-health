import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolution } from '../../domain/app-health-technical-solution.aggregate';

@Injectable()
export class AppHealthRawSQLTechnicalSolutionsService
{
    constructor(
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthTechnicalSolution[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
