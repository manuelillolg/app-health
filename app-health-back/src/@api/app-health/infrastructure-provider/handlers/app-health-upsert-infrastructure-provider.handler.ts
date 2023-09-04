import { AppHealthInfrastructureProviderDto, AppHealthUpdateInfrastructureProviderByIdDto } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider, AppHealthUpdateInfrastructureProviderByIdInput } from '@api/graphql';
import { AppHealthFindInfrastructureProviderByIdQuery, AppHealthUpsertInfrastructureProviderCommand } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertInfrastructureProviderHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateInfrastructureProviderByIdInput | AppHealthUpdateInfrastructureProviderByIdDto,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider | AppHealthInfrastructureProviderDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertInfrastructureProviderCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindInfrastructureProviderByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
