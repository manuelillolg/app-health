import { AppHealthApplicationApiDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { AppHealthGetApplicationApisQuery } from '@app/app-health/application-api';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetApplicationApisHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationApi[] | AppHealthApplicationApiDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetApplicationApisQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
