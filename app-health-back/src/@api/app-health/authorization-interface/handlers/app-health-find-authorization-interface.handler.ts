import { AppHealthAuthorizationInterfaceDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { AppHealthFindAuthorizationInterfaceQuery } from '@app/app-health/authorization-interface';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindAuthorizationInterfaceHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface | AppHealthAuthorizationInterfaceDto>
    {
        return await this.queryBus.ask(new AppHealthFindAuthorizationInterfaceQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
