import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateTechnicalSolutionsQuery } from './app-health-paginate-technical-solutions.query';
import { AppHealthPaginateTechnicalSolutionsService } from './app-health-paginate-technical-solutions.service';

@QueryHandler(AppHealthPaginateTechnicalSolutionsQuery)
export class AppHealthPaginateTechnicalSolutionsQueryHandler implements IQueryHandler<AppHealthPaginateTechnicalSolutionsQuery>
{
    constructor(
        private readonly paginateTechnicalSolutionsService: AppHealthPaginateTechnicalSolutionsService,
    ) {}

    async execute(query: AppHealthPaginateTechnicalSolutionsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateTechnicalSolutionsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
