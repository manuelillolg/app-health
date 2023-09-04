import { AppHealthApplicationViewDto } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { AppHealthDeleteApplicationViewsCommand, AppHealthGetApplicationViewsQuery } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationViewsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationView[] | AppHealthApplicationViewDto[]>
    {
        const applicationViews = await this.queryBus.ask(new AppHealthGetApplicationViewsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationViewsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationViews;
    }
}
