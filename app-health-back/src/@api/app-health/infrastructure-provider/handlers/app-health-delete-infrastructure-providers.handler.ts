import { AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { AppHealthDeleteInfrastructureProvidersCommand, AppHealthGetInfrastructureProvidersQuery } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteInfrastructureProvidersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider[] | AppHealthInfrastructureProviderDto[]>
    {
        const infrastructureProviders = await this.queryBus.ask(new AppHealthGetInfrastructureProvidersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteInfrastructureProvidersCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return infrastructureProviders;
    }
}
