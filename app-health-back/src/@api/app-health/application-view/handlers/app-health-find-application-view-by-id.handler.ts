import { AppHealthApplicationViewDto } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { AppHealthFindApplicationViewByIdQuery } from '@app/app-health/application-view';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationViewByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationView | AppHealthApplicationViewDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationViewByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
