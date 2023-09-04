import { AppHealthApplicationDto } from '@api/app-health/application';
import { AppHealthApplication } from '@api/graphql';
import { AppHealthDeleteApplicationsCommand, AppHealthGetApplicationsQuery } from '@app/app-health/application';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplication[] | AppHealthApplicationDto[]>
    {
        const applications = await this.queryBus.ask(new AppHealthGetApplicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applications;
    }
}
