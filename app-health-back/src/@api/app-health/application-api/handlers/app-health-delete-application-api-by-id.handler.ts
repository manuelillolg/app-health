import { AppHealthApplicationApiDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { AppHealthDeleteApplicationApiByIdCommand, AppHealthFindApplicationApiByIdQuery } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationApiByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationApi | AppHealthApplicationApiDto>
    {
        const applicationApi = await this.queryBus.ask(new AppHealthFindApplicationApiByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationApiByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationApi;
    }
}
