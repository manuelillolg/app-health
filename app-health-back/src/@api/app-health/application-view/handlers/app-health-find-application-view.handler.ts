import { AppHealthApplicationViewDto } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { AppHealthFindApplicationViewQuery } from '@app/app-health/application-view';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationViewHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationView | AppHealthApplicationViewDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationViewQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
