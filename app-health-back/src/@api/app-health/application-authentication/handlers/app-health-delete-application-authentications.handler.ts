import { AppHealthApplicationAuthenticationDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication } from '@api/graphql';
import { AppHealthDeleteApplicationAuthenticationsCommand, AppHealthGetApplicationAuthenticationsQuery } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationAuthenticationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication[] | AppHealthApplicationAuthenticationDto[]>
    {
        const applicationAuthentications = await this.queryBus.ask(new AppHealthGetApplicationAuthenticationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationAuthenticationsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationAuthentications;
    }
}
