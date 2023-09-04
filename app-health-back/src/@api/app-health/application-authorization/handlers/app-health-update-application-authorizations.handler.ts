import { AppHealthApplicationAuthorizationDto, AppHealthUpdateApplicationAuthorizationsDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthUpdateApplicationAuthorizationsInput } from '@api/graphql';
import { AppHealthGetApplicationAuthorizationsQuery, AppHealthUpdateApplicationAuthorizationsCommand } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationAuthorizationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationAuthorizationsInput | AppHealthUpdateApplicationAuthorizationsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization | AppHealthApplicationAuthorizationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationAuthorizationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationAuthorizationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
