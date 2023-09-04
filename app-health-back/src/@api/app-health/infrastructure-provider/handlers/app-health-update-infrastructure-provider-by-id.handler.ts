import { AppHealthInfrastructureProviderDto, AppHealthUpdateInfrastructureProviderByIdDto } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider, AppHealthUpdateInfrastructureProviderByIdInput } from '@api/graphql';
import { AppHealthFindInfrastructureProviderByIdQuery, AppHealthUpdateInfrastructureProviderByIdCommand } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateInfrastructureProviderByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateInfrastructureProviderByIdInput | AppHealthUpdateInfrastructureProviderByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider | AppHealthInfrastructureProviderDto>
    {
        const infrastructureProvider = await this.queryBus.ask(new AppHealthFindInfrastructureProviderByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, infrastructureProvider);

        await this.commandBus.dispatch(new AppHealthUpdateInfrastructureProviderByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindInfrastructureProviderByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
