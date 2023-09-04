import { AppHealthCreateInfrastructureProviderDto, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { AppHealthCreateInfrastructureProviderInput, AppHealthInfrastructureProvider } from '@api/graphql';
import { AppHealthCreateInfrastructureProviderCommand, AppHealthFindInfrastructureProviderByIdQuery } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateInfrastructureProviderHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateInfrastructureProviderInput | AppHealthCreateInfrastructureProviderDto,
        timezone?: string,
    ): Promise<AppHealthInfrastructureProvider | AppHealthInfrastructureProviderDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateInfrastructureProviderCommand(
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
