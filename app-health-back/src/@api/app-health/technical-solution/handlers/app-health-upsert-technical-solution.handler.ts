import { AppHealthTechnicalSolutionDto, AppHealthUpdateTechnicalSolutionByIdDto } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution, AppHealthUpdateTechnicalSolutionByIdInput } from '@api/graphql';
import { AppHealthFindTechnicalSolutionByIdQuery, AppHealthUpsertTechnicalSolutionCommand } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertTechnicalSolutionHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateTechnicalSolutionByIdInput | AppHealthUpdateTechnicalSolutionByIdDto,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution | AppHealthTechnicalSolutionDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertTechnicalSolutionCommand(
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
