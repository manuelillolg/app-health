import { AppHealthApplicationAuthenticationDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication } from '@api/graphql';
import { AppHealthGetApplicationAuthenticationsQuery } from '@app/app-health/application-authentication';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetApplicationAuthenticationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication[] | AppHealthApplicationAuthenticationDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetApplicationAuthenticationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
