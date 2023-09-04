import { AppHealthApplicationDto } from '@api/app-health/application';
import { AppHealthApplication } from '@api/graphql';
import { AppHealthGetApplicationsQuery } from '@app/app-health/application';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetApplicationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplication[] | AppHealthApplicationDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetApplicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
