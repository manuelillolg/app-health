import { AppHealthAuthenticationInterfaceDto, AppHealthUpdateAuthenticationInterfaceByIdDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthUpdateAuthenticationInterfaceByIdInput } from '@api/graphql';
import { AppHealthFindAuthenticationInterfaceByIdQuery, AppHealthUpdateAuthenticationInterfaceByIdCommand } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateAuthenticationInterfaceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateAuthenticationInterfaceByIdInput | AppHealthUpdateAuthenticationInterfaceByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface | AppHealthAuthenticationInterfaceDto>
    {
        const authenticationInterface = await this.queryBus.ask(new AppHealthFindAuthenticationInterfaceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, authenticationInterface);

        await this.commandBus.dispatch(new AppHealthUpdateAuthenticationInterfaceByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindAuthenticationInterfaceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
