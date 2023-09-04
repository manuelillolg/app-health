import { AppHealthApplicationIntegrationDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { AppHealthFindApplicationIntegrationQuery } from '@app/app-health/application-integration';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationIntegrationHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration | AppHealthApplicationIntegrationDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationIntegrationQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
