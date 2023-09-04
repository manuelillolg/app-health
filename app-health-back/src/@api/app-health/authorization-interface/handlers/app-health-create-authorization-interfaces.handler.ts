import { AppHealthCreateAuthorizationInterfaceDto } from '@api/app-health/authorization-interface';
import { AppHealthCreateAuthorizationInterfaceInput } from '@api/graphql';
import { AppHealthCreateAuthorizationInterfacesCommand } from '@app/app-health/authorization-interface';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateAuthorizationInterfacesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateAuthorizationInterfaceInput[] | AppHealthCreateAuthorizationInterfaceDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateAuthorizationInterfacesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
