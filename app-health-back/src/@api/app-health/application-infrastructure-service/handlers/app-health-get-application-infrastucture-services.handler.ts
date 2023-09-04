import { AppHealthApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { AppHealthGetApplicationInfrastuctureServicesQuery } from '@app/app-health/application-infrastructure-service';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetApplicationInfrastuctureServicesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService[] | AppHealthApplicationInfrastructureServiceDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetApplicationInfrastuctureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
