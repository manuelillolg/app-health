import { AppHealthAuthorizationInterfaceDto, AppHealthUpdateAuthorizationInterfacesDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthUpdateAuthorizationInterfacesInput } from '@api/graphql';
import { AppHealthGetAuthorizationInterfacesQuery, AppHealthUpdateAuthorizationInterfacesCommand } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateAuthorizationInterfacesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateAuthorizationInterfacesInput | AppHealthUpdateAuthorizationInterfacesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface | AppHealthAuthorizationInterfaceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateAuthorizationInterfacesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetAuthorizationInterfacesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
