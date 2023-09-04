import { AppHealthAuthenticationInterfaceDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { AppHealthGetAuthenticationInterfacesQuery } from '@app/app-health/authentication-interface';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetAuthenticationInterfacesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface[] | AppHealthAuthenticationInterfaceDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetAuthenticationInterfacesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
