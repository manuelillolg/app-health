import { AppHealthCreateApplicationAuthorizationDto } from '@api/app-health/application-authorization';
import { AppHealthCreateApplicationAuthorizationInput } from '@api/graphql';
import { AppHealthCreateApplicationAuthorizationsCommand } from '@app/app-health/application-authorization';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationAuthorizationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationAuthorizationInput[] | AppHealthCreateApplicationAuthorizationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationAuthorizationsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
