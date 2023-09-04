import { AppHealthCreateTechnicalSolutionDto, AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { AppHealthCreateTechnicalSolutionInput, AppHealthTechnicalSolution } from '@api/graphql';
import { AppHealthCreateTechnicalSolutionCommand, AppHealthFindTechnicalSolutionByIdQuery } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateTechnicalSolutionHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateTechnicalSolutionInput | AppHealthCreateTechnicalSolutionDto,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution | AppHealthTechnicalSolutionDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateTechnicalSolutionCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindTechnicalSolutionByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
