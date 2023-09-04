import { AppHealthCreateApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthCreateApplicationInfrastructureServiceInput } from '@api/graphql';
import { AppHealthCreateApplicationInfrastuctureServicesCommand } from '@app/app-health/application-infrastructure-service';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationInfrastuctureServicesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationInfrastructureServiceInput[] | AppHealthCreateApplicationInfrastructureServiceDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationInfrastuctureServicesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
