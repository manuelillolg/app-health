import { AppHealthInfrastructureServiceDto, AppHealthUpdateInfrastructureServicesDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService, AppHealthUpdateInfrastructureServicesInput } from '@api/graphql';
import { AppHealthGetInfrastructureServicesQuery, AppHealthUpdateInfrastructureServicesCommand } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateInfrastructureServicesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateInfrastructureServicesInput | AppHealthUpdateInfrastructureServicesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService | AppHealthInfrastructureServiceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateInfrastructureServicesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetInfrastructureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
