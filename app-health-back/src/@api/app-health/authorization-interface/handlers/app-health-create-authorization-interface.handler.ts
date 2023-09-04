import { AppHealthAuthorizationInterfaceDto, AppHealthCreateAuthorizationInterfaceDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthCreateAuthorizationInterfaceInput } from '@api/graphql';
import { AppHealthCreateAuthorizationInterfaceCommand, AppHealthFindAuthorizationInterfaceByIdQuery } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateAuthorizationInterfaceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateAuthorizationInterfaceInput | AppHealthCreateAuthorizationInterfaceDto,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface | AppHealthAuthorizationInterfaceDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateAuthorizationInterfaceCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindAuthorizationInterfaceByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
