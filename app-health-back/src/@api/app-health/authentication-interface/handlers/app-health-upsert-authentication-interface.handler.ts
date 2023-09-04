import { AppHealthAuthenticationInterfaceDto, AppHealthUpdateAuthenticationInterfaceByIdDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthUpdateAuthenticationInterfaceByIdInput } from '@api/graphql';
import { AppHealthFindAuthenticationInterfaceByIdQuery, AppHealthUpsertAuthenticationInterfaceCommand } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertAuthenticationInterfaceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateAuthenticationInterfaceByIdInput | AppHealthUpdateAuthenticationInterfaceByIdDto,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface | AppHealthAuthenticationInterfaceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertAuthenticationInterfaceCommand(
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
