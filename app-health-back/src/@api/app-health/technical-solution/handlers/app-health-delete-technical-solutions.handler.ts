import { AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { AppHealthDeleteTechnicalSolutionsCommand, AppHealthGetTechnicalSolutionsQuery } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteTechnicalSolutionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution[] | AppHealthTechnicalSolutionDto[]>
    {
        const technicalSolutions = await this.queryBus.ask(new AppHealthGetTechnicalSolutionsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteTechnicalSolutionsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return technicalSolutions;
    }
}
