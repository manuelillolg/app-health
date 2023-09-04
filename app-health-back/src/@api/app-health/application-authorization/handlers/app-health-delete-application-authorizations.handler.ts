import { AppHealthApplicationAuthorizationDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization } from '@api/graphql';
import { AppHealthDeleteApplicationAuthorizationsCommand, AppHealthGetApplicationAuthorizationsQuery } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationAuthorizationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization[] | AppHealthApplicationAuthorizationDto[]>
    {
        const applicationAuthorizations = await this.queryBus.ask(new AppHealthGetApplicationAuthorizationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationAuthorizationsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationAuthorizations;
    }
}
