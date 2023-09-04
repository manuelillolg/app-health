import { AppHealthApplicationIntegrationDto, AppHealthCreateApplicationIntegrationDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthCreateApplicationIntegrationInput } from '@api/graphql';
import { AppHealthCreateApplicationIntegrationCommand, AppHealthFindApplicationIntegrationByIdQuery } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationIntegrationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationIntegrationInput | AppHealthCreateApplicationIntegrationDto,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration | AppHealthApplicationIntegrationDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationIntegrationCommand(
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
