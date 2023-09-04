import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthTechnicalSolutionResponse } from '../../domain/app-health-technical-solution.response';
import { AppHealthTechnicalSolutionMapper } from '../../domain/app-health-technical-solution.mapper';
import { AppHealthRawSQLTechnicalSolutionsQuery } from './app-health-raw-sql-technical-solutions.query';
import { AppHealthRawSQLTechnicalSolutionsService } from './app-health-raw-sql-technical-solutions.service';

@QueryHandler(AppHealthRawSQLTechnicalSolutionsQuery)
export class AppHealthRawSQLTechnicalSolutionsQueryHandler implements IQueryHandler<AppHealthRawSQLTechnicalSolutionsQuery>
{
    private readonly mapper: AppHealthTechnicalSolutionMapper = new AppHealthTechnicalSolutionMapper();

    constructor(
        private readonly rawSQLTechnicalSolutionsService: AppHealthRawSQLTechnicalSolutionsService,
    ) {}

    async execute(query: AppHealthRawSQLTechnicalSolutionsQuery): Promise<AppHealthTechnicalSolutionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLTechnicalSolutionsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
