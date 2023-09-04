import { AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { AppHealthFindInfrastructureServiceQuery } from '@app/app-health/infrastructure-service';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindInfrastructureServiceHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService | AppHealthInfrastructureServiceDto>
    {
        return await this.queryBus.ask(new AppHealthFindInfrastructureServiceQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
