import { AppHealthApplicationIntegrationDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { AppHealthFindApplicationIntegrationByIdQuery } from '@app/app-health/application-integration';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationIntegrationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration | AppHealthApplicationIntegrationDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationIntegrationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
