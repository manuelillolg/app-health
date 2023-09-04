import { AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { AppHealthFindInfrastructureProviderQuery } from '@app/app-health/infrastructure-provider';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindInfrastructureProviderHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider | AppHealthInfrastructureProviderDto>
    {
        return await this.queryBus.ask(new AppHealthFindInfrastructureProviderQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
