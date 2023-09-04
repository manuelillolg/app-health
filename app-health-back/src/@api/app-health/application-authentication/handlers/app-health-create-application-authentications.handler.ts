import { AppHealthCreateApplicationAuthenticationDto } from '@api/app-health/application-authentication';
import { AppHealthCreateApplicationAuthenticationInput } from '@api/graphql';
import { AppHealthCreateApplicationAuthenticationsCommand } from '@app/app-health/application-authentication';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationAuthenticationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationAuthenticationInput[] | AppHealthCreateApplicationAuthenticationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationAuthenticationsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
