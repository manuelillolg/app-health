import { Pagination } from '@api/graphql';
import { AppHealthPaginateInfrastructureServicesQuery } from '@app/app-health/infrastructure-service';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateInfrastructureServicesHandler
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
        return await this.queryBus.ask(new AppHealthPaginateInfrastructureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
