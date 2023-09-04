import { AppHealthCreateApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthCreateApiInterfaceTypeInput } from '@api/graphql';
import { AppHealthCreateApiInterfaceTypesCommand } from '@app/app-health/api-interface-type';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApiInterfaceTypesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApiInterfaceTypeInput[] | AppHealthCreateApiInterfaceTypeDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApiInterfaceTypesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
