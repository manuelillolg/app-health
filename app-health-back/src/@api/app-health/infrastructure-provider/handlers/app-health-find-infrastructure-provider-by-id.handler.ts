import { AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { AppHealthFindInfrastructureProviderByIdQuery } from '@app/app-health/infrastructure-provider';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindInfrastructureProviderByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider | AppHealthInfrastructureProviderDto>
    {
        return await this.queryBus.ask(new AppHealthFindInfrastructureProviderByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
