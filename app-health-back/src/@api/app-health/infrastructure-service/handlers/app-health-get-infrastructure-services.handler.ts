import { AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { AppHealthGetInfrastructureServicesQuery } from '@app/app-health/infrastructure-service';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetInfrastructureServicesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService[] | AppHealthInfrastructureServiceDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetInfrastructureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
