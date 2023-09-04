import { AppHealthCreateInfrastructureServiceDto, AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { AppHealthCreateInfrastructureServiceInput, AppHealthInfrastructureService } from '@api/graphql';
import { AppHealthCreateInfrastructureServiceCommand, AppHealthFindInfrastructureServiceByIdQuery } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateInfrastructureServiceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateInfrastructureServiceInput | AppHealthCreateInfrastructureServiceDto,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService | AppHealthInfrastructureServiceDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateInfrastructureServiceCommand(
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
