import { AppHealthApplicationDto, AppHealthUpdateApplicationsDto } from '@api/app-health/application';
import { AppHealthApplication, AppHealthUpdateApplicationsInput } from '@api/graphql';
import { AppHealthGetApplicationsQuery, AppHealthUpdateApplicationsCommand } from '@app/app-health/application';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationsInput | AppHealthUpdateApplicationsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplication | AppHealthApplicationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
