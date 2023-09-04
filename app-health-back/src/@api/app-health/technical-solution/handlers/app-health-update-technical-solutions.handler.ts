import { AppHealthTechnicalSolutionDto, AppHealthUpdateTechnicalSolutionsDto } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution, AppHealthUpdateTechnicalSolutionsInput } from '@api/graphql';
import { AppHealthGetTechnicalSolutionsQuery, AppHealthUpdateTechnicalSolutionsCommand } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateTechnicalSolutionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateTechnicalSolutionsInput | AppHealthUpdateTechnicalSolutionsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution | AppHealthTechnicalSolutionDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateTechnicalSolutionsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetTechnicalSolutionsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
