import { AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { AppHealthDeleteTechnicalSolutionByIdCommand, AppHealthFindTechnicalSolutionByIdQuery } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteTechnicalSolutionByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution | AppHealthTechnicalSolutionDto>
    {
        const technicalSolution = await this.queryBus.ask(new AppHealthFindTechnicalSolutionByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteTechnicalSolutionByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return technicalSolution;
    }
}
