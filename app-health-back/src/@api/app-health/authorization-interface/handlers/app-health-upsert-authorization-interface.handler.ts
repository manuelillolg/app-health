import { AppHealthAuthorizationInterfaceDto, AppHealthUpdateAuthorizationInterfaceByIdDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthUpdateAuthorizationInterfaceByIdInput } from '@api/graphql';
import { AppHealthFindAuthorizationInterfaceByIdQuery, AppHealthUpsertAuthorizationInterfaceCommand } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertAuthorizationInterfaceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateAuthorizationInterfaceByIdInput | AppHealthUpdateAuthorizationInterfaceByIdDto,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface | AppHealthAuthorizationInterfaceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertAuthorizationInterfaceCommand(
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
