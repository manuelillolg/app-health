import { AppHealthApplicationInfrastructureServiceDto, AppHealthUpdateApplicationInfrastructureServiceByIdDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthUpdateApplicationInfrastructureServiceByIdInput } from '@api/graphql';
import { AppHealthFindApplicationInfrastructureServiceByIdQuery, AppHealthUpsertApplicationInfrastructureServiceCommand } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationInfrastructureServiceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationInfrastructureServiceByIdInput | AppHealthUpdateApplicationInfrastructureServiceByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService | AppHealthApplicationInfrastructureServiceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationInfrastructureServiceCommand(
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
