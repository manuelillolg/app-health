import { AppHealthApplicationIntegrationDto, AppHealthUpdateApplicationIntegrationsDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthUpdateApplicationIntegrationsInput } from '@api/graphql';
import { AppHealthGetApplicationIntegrationsQuery, AppHealthUpdateApplicationIntegrationsCommand } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationIntegrationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationIntegrationsInput | AppHealthUpdateApplicationIntegrationsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration | AppHealthApplicationIntegrationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationIntegrationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationIntegrationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
