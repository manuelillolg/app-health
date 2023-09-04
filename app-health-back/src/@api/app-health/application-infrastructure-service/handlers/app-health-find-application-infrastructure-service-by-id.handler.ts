import { AppHealthApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { AppHealthFindApplicationInfrastructureServiceByIdQuery } from '@app/app-health/application-infrastructure-service';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationInfrastructureServiceByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService | AppHealthApplicationInfrastructureServiceDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationInfrastructureServiceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
