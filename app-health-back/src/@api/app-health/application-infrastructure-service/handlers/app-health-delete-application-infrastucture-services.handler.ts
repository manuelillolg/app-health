import { AppHealthApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { AppHealthDeleteApplicationInfrastuctureServicesCommand, AppHealthGetApplicationInfrastuctureServicesQuery } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationInfrastuctureServicesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService[] | AppHealthApplicationInfrastructureServiceDto[]>
    {
        const applicationInfrastuctureServices = await this.queryBus.ask(new AppHealthGetApplicationInfrastuctureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationInfrastuctureServicesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationInfrastuctureServices;
    }
}
