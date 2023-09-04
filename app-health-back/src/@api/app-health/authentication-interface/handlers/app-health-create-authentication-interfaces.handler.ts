import { AppHealthCreateAuthenticationInterfaceDto } from '@api/app-health/authentication-interface';
import { AppHealthCreateAuthenticationInterfaceInput } from '@api/graphql';
import { AppHealthCreateAuthenticationInterfacesCommand } from '@app/app-health/authentication-interface';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateAuthenticationInterfacesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateAuthenticationInterfaceInput[] | AppHealthCreateAuthenticationInterfaceDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateAuthenticationInterfacesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
