import { AppHealthCreateApplicationIntegrationDto } from '@api/app-health/application-integration';
import { AppHealthCreateApplicationIntegrationInput } from '@api/graphql';
import { AppHealthCreateApplicationIntegrationsCommand } from '@app/app-health/application-integration';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationIntegrationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationIntegrationInput[] | AppHealthCreateApplicationIntegrationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationIntegrationsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
