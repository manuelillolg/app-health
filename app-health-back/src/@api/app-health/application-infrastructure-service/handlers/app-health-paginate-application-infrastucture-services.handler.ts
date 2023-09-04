import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationInfrastuctureServicesQuery } from '@app/app-health/application-infrastructure-service';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationInfrastuctureServicesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new AppHealthPaginateApplicationInfrastuctureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
