import { AppHealthAuthorizationInterfaceDto, AppHealthUpdateAuthorizationInterfaceByIdDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthUpdateAuthorizationInterfaceByIdInput } from '@api/graphql';
import { AppHealthFindAuthorizationInterfaceByIdQuery, AppHealthUpdateAuthorizationInterfaceByIdCommand } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateAuthorizationInterfaceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateAuthorizationInterfaceByIdInput | AppHealthUpdateAuthorizationInterfaceByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface | AppHealthAuthorizationInterfaceDto>
    {
        const authorizationInterface = await this.queryBus.ask(new AppHealthFindAuthorizationInterfaceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, authorizationInterface);

        await this.commandBus.dispatch(new AppHealthUpdateAuthorizationInterfaceByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindAuthorizationInterfaceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
