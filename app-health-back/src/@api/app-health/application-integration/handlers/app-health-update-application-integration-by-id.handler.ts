import { AppHealthApplicationIntegrationDto, AppHealthUpdateApplicationIntegrationByIdDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthUpdateApplicationIntegrationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationIntegrationByIdQuery, AppHealthUpdateApplicationIntegrationByIdCommand } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationIntegrationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationIntegrationByIdInput | AppHealthUpdateApplicationIntegrationByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration | AppHealthApplicationIntegrationDto>
    {
        const applicationIntegration = await this.queryBus.ask(new AppHealthFindApplicationIntegrationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationIntegration);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationIntegrationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationIntegrationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
