import { AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { AppHealthDeleteInfrastructureServicesCommand, AppHealthGetInfrastructureServicesQuery } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteInfrastructureServicesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService[] | AppHealthInfrastructureServiceDto[]>
    {
        const infrastructureServices = await this.queryBus.ask(new AppHealthGetInfrastructureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteInfrastructureServicesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return infrastructureServices;
    }
}
