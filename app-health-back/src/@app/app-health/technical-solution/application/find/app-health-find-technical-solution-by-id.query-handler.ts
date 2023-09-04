import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthTechnicalSolutionResponse } from '../../domain/app-health-technical-solution.response';
import { AppHealthTechnicalSolutionMapper } from '../../domain/app-health-technical-solution.mapper';
import { AppHealthTechnicalSolutionId } from '../../domain/value-objects';
import { AppHealthFindTechnicalSolutionByIdQuery } from './app-health-find-technical-solution-by-id.query';
import { AppHealthFindTechnicalSolutionByIdService } from './app-health-find-technical-solution-by-id.service';

@QueryHandler(AppHealthFindTechnicalSolutionByIdQuery)
export class AppHealthFindTechnicalSolutionByIdQueryHandler implements IQueryHandler<AppHealthFindTechnicalSolutionByIdQuery>
{
    private readonly mapper: AppHealthTechnicalSolutionMapper = new AppHealthTechnicalSolutionMapper();

    constructor(
        private readonly findTechnicalSolutionByIdService: AppHealthFindTechnicalSolutionByIdService,
    ) {}

    async execute(query: AppHealthFindTechnicalSolutionByIdQuery): Promise<AppHealthTechnicalSolutionResponse>
    {
        const technicalSolution = await this.findTechnicalSolutionByIdService.main(
            new AppHealthTechnicalSolutionId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(technicalSolution);
    }
}
