import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthTechnicalSolutionResponse } from '../../domain/app-health-technical-solution.response';
import { AppHealthTechnicalSolutionMapper } from '../../domain/app-health-technical-solution.mapper';
import { AppHealthFindTechnicalSolutionQuery } from './app-health-find-technical-solution.query';
import { AppHealthFindTechnicalSolutionService } from './app-health-find-technical-solution.service';

@QueryHandler(AppHealthFindTechnicalSolutionQuery)
export class AppHealthFindTechnicalSolutionQueryHandler implements IQueryHandler<AppHealthFindTechnicalSolutionQuery>
{
    private readonly mapper: AppHealthTechnicalSolutionMapper = new AppHealthTechnicalSolutionMapper();

    constructor(
        private readonly findTechnicalSolutionService: AppHealthFindTechnicalSolutionService,
    ) {}

    async execute(query: AppHealthFindTechnicalSolutionQuery): Promise<AppHealthTechnicalSolutionResponse>
    {
        const technicalSolution = await this.findTechnicalSolutionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(technicalSolution);
    }
}
