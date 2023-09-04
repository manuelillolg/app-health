import { AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { AppHealthFindTechnicalSolutionByIdQuery } from '@app/app-health/technical-solution';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindTechnicalSolutionByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution | AppHealthTechnicalSolutionDto>
    {
        return await this.queryBus.ask(new AppHealthFindTechnicalSolutionByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
