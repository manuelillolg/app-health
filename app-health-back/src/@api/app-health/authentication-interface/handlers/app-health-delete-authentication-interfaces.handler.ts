import { AppHealthAuthenticationInterfaceDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { AppHealthDeleteAuthenticationInterfacesCommand, AppHealthGetAuthenticationInterfacesQuery } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteAuthenticationInterfacesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface[] | AppHealthAuthenticationInterfaceDto[]>
    {
        const authenticationInterfaces = await this.queryBus.ask(new AppHealthGetAuthenticationInterfacesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteAuthenticationInterfacesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return authenticationInterfaces;
    }
}
