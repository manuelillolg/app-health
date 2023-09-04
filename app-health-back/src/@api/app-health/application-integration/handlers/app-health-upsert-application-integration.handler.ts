import { AppHealthApplicationIntegrationDto, AppHealthUpdateApplicationIntegrationByIdDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthUpdateApplicationIntegrationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationIntegrationByIdQuery, AppHealthUpsertApplicationIntegrationCommand } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationIntegrationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationIntegrationByIdInput | AppHealthUpdateApplicationIntegrationByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration | AppHealthApplicationIntegrationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationIntegrationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationIntegrationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
