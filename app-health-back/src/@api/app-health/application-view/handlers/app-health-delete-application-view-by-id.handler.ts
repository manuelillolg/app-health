import { AppHealthApplicationViewDto } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { AppHealthDeleteApplicationViewByIdCommand, AppHealthFindApplicationViewByIdQuery } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationViewByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationView | AppHealthApplicationViewDto>
    {
        const applicationView = await this.queryBus.ask(new AppHealthFindApplicationViewByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationViewByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationView;
    }
}
