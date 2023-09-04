import { AppHealthApplicationApiDto, AppHealthUpdateApplicationApisDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthUpdateApplicationApisInput } from '@api/graphql';
import { AppHealthGetApplicationApisQuery, AppHealthUpdateApplicationApisCommand } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationApisHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationApisInput | AppHealthUpdateApplicationApisDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationApi | AppHealthApplicationApiDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationApisCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationApisQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
