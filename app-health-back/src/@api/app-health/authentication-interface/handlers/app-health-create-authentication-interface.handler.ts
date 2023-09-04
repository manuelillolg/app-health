import { AppHealthAuthenticationInterfaceDto, AppHealthCreateAuthenticationInterfaceDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthCreateAuthenticationInterfaceInput } from '@api/graphql';
import { AppHealthCreateAuthenticationInterfaceCommand, AppHealthFindAuthenticationInterfaceByIdQuery } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateAuthenticationInterfaceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateAuthenticationInterfaceInput | AppHealthCreateAuthenticationInterfaceDto,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface | AppHealthAuthenticationInterfaceDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateAuthenticationInterfaceCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindAuthenticationInterfaceByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
