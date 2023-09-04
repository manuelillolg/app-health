import { Pagination } from '@api/graphql';
import { AppHealthPaginateTechnicalSolutionsQuery } from '@app/app-health/technical-solution';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateTechnicalSolutionsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new AppHealthPaginateTechnicalSolutionsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
