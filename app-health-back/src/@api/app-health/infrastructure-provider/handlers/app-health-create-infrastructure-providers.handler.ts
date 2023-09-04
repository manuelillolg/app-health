import { AppHealthCreateInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { AppHealthCreateInfrastructureProviderInput } from '@api/graphql';
import { AppHealthCreateInfrastructureProvidersCommand } from '@app/app-health/infrastructure-provider';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateInfrastructureProvidersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateInfrastructureProviderInput[] | AppHealthCreateInfrastructureProviderDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateInfrastructureProvidersCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
