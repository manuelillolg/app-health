import { AppHealthApplicationViewDto, AppHealthUpdateApplicationViewsDto } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthUpdateApplicationViewsInput } from '@api/graphql';
import { AppHealthGetApplicationViewsQuery, AppHealthUpdateApplicationViewsCommand } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationViewsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationViewsInput | AppHealthUpdateApplicationViewsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationView | AppHealthApplicationViewDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationViewsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationViewsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
