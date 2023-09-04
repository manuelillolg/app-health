import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthTechnicalSolutionResponse } from '../../domain/app-health-technical-solution.response';
import { AppHealthTechnicalSolutionMapper } from '../../domain/app-health-technical-solution.mapper';
import { AppHealthGetTechnicalSolutionsQuery } from './app-health-get-technical-solutions.query';
import { AppHealthGetTechnicalSolutionsService } from './app-health-get-technical-solutions.service';

@QueryHandler(AppHealthGetTechnicalSolutionsQuery)
export class AppHealthGetTechnicalSolutionsQueryHandler implements IQueryHandler<AppHealthGetTechnicalSolutionsQuery>
{
    private readonly mapper: AppHealthTechnicalSolutionMapper = new AppHealthTechnicalSolutionMapper();

    constructor(
        private readonly getTechnicalSolutionsService: AppHealthGetTechnicalSolutionsService,
    ) {}

    async execute(query: AppHealthGetTechnicalSolutionsQuery): Promise<AppHealthTechnicalSolutionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getTechnicalSolutionsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
