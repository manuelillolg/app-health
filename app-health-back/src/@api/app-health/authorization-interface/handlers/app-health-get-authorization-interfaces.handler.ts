import { AppHealthAuthorizationInterfaceDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { AppHealthGetAuthorizationInterfacesQuery } from '@app/app-health/authorization-interface';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetAuthorizationInterfacesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface[] | AppHealthAuthorizationInterfaceDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetAuthorizationInterfacesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
