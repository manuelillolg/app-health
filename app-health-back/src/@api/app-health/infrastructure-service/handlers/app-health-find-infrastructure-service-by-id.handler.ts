import { AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { AppHealthFindInfrastructureServiceByIdQuery } from '@app/app-health/infrastructure-service';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindInfrastructureServiceByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService | AppHealthInfrastructureServiceDto>
    {
        return await this.queryBus.ask(new AppHealthFindInfrastructureServiceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
