import { AppHealthInfrastructureServiceDto, AppHealthUpdateInfrastructureServiceByIdDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService, AppHealthUpdateInfrastructureServiceByIdInput } from '@api/graphql';
import { AppHealthFindInfrastructureServiceByIdQuery, AppHealthUpsertInfrastructureServiceCommand } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertInfrastructureServiceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateInfrastructureServiceByIdInput | AppHealthUpdateInfrastructureServiceByIdDto,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService | AppHealthInfrastructureServiceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertInfrastructureServiceCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindInfrastructureServiceByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
