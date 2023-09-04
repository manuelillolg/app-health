import { AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { AppHealthGetTechnicalSolutionsQuery } from '@app/app-health/technical-solution';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetTechnicalSolutionsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution[] | AppHealthTechnicalSolutionDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetTechnicalSolutionsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
