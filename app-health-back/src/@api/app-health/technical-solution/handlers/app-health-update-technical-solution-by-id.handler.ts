import { AppHealthTechnicalSolutionDto, AppHealthUpdateTechnicalSolutionByIdDto } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution, AppHealthUpdateTechnicalSolutionByIdInput } from '@api/graphql';
import { AppHealthFindTechnicalSolutionByIdQuery, AppHealthUpdateTechnicalSolutionByIdCommand } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateTechnicalSolutionByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateTechnicalSolutionByIdInput | AppHealthUpdateTechnicalSolutionByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthTechnicalSolution | AppHealthTechnicalSolutionDto>
    {
        const technicalSolution = await this.queryBus.ask(new AppHealthFindTechnicalSolutionByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, technicalSolution);

        await this.commandBus.dispatch(new AppHealthUpdateTechnicalSolutionByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindTechnicalSolutionByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
