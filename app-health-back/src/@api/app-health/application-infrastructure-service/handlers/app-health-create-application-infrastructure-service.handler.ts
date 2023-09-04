import { AppHealthApplicationInfrastructureServiceDto, AppHealthCreateApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthCreateApplicationInfrastructureServiceInput } from '@api/graphql';
import { AppHealthCreateApplicationInfrastructureServiceCommand, AppHealthFindApplicationInfrastructureServiceByIdQuery } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationInfrastructureServiceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationInfrastructureServiceInput | AppHealthCreateApplicationInfrastructureServiceDto,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService | AppHealthApplicationInfrastructureServiceDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationInfrastructureServiceCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationInfrastructureServiceByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
