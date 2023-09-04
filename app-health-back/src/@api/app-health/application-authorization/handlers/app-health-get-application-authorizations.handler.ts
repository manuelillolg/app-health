import { AppHealthApplicationAuthorizationDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization } from '@api/graphql';
import { AppHealthGetApplicationAuthorizationsQuery } from '@app/app-health/application-authorization';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetApplicationAuthorizationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization[] | AppHealthApplicationAuthorizationDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetApplicationAuthorizationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
