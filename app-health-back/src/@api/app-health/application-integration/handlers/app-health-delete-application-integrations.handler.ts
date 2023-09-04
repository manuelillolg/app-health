import { AppHealthApplicationIntegrationDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { AppHealthDeleteApplicationIntegrationsCommand, AppHealthGetApplicationIntegrationsQuery } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationIntegrationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration[] | AppHealthApplicationIntegrationDto[]>
    {
        const applicationIntegrations = await this.queryBus.ask(new AppHealthGetApplicationIntegrationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationIntegrationsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationIntegrations;
    }
}
