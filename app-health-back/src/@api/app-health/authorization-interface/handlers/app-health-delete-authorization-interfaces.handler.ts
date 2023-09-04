import { AppHealthAuthorizationInterfaceDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { AppHealthDeleteAuthorizationInterfacesCommand, AppHealthGetAuthorizationInterfacesQuery } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteAuthorizationInterfacesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface[] | AppHealthAuthorizationInterfaceDto[]>
    {
        const authorizationInterfaces = await this.queryBus.ask(new AppHealthGetAuthorizationInterfacesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteAuthorizationInterfacesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return authorizationInterfaces;
    }
}
