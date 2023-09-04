import { AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { AppHealthDeleteInfrastructureProviderByIdCommand, AppHealthFindInfrastructureProviderByIdQuery } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteInfrastructureProviderByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider | AppHealthInfrastructureProviderDto>
    {
        const infrastructureProvider = await this.queryBus.ask(new AppHealthFindInfrastructureProviderByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteInfrastructureProviderByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return infrastructureProvider;
    }
}
