import { AppHealthApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { AppHealthDeleteApplicationInfrastructureServiceByIdCommand, AppHealthFindApplicationInfrastructureServiceByIdQuery } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationInfrastructureServiceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService | AppHealthApplicationInfrastructureServiceDto>
    {
        const applicationInfrastructureService = await this.queryBus.ask(new AppHealthFindApplicationInfrastructureServiceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationInfrastructureServiceByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationInfrastructureService;
    }
}
