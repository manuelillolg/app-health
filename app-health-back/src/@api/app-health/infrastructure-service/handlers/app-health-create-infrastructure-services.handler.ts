import { AppHealthCreateInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { AppHealthCreateInfrastructureServiceInput } from '@api/graphql';
import { AppHealthCreateInfrastructureServicesCommand } from '@app/app-health/infrastructure-service';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateInfrastructureServicesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateInfrastructureServiceInput[] | AppHealthCreateInfrastructureServiceDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateInfrastructureServicesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
