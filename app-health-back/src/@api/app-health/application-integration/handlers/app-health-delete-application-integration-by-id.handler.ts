import { AppHealthApplicationIntegrationDto } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { AppHealthDeleteApplicationIntegrationByIdCommand, AppHealthFindApplicationIntegrationByIdQuery } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationIntegrationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationIntegration | AppHealthApplicationIntegrationDto>
    {
        const applicationIntegration = await this.queryBus.ask(new AppHealthFindApplicationIntegrationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationIntegrationByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationIntegration;
    }
}
