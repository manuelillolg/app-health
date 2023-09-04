import { AppHealthApplicationApiDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { AppHealthDeleteApplicationApisCommand, AppHealthGetApplicationApisQuery } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationApisHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationApi[] | AppHealthApplicationApiDto[]>
    {
        const applicationApis = await this.queryBus.ask(new AppHealthGetApplicationApisQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationApisCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationApis;
    }
}
