import { AppHealthInfrastructureProviderDto, AppHealthUpdateInfrastructureProvidersDto } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider, AppHealthUpdateInfrastructureProvidersInput } from '@api/graphql';
import { AppHealthGetInfrastructureProvidersQuery, AppHealthUpdateInfrastructureProvidersCommand } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateInfrastructureProvidersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateInfrastructureProvidersInput | AppHealthUpdateInfrastructureProvidersDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider | AppHealthInfrastructureProviderDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateInfrastructureProvidersCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetInfrastructureProvidersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
