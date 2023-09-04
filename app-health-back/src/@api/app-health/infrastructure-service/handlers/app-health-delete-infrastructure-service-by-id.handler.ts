import { AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { AppHealthDeleteInfrastructureServiceByIdCommand, AppHealthFindInfrastructureServiceByIdQuery } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteInfrastructureServiceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService | AppHealthInfrastructureServiceDto>
    {
        const infrastructureService = await this.queryBus.ask(new AppHealthFindInfrastructureServiceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteInfrastructureServiceByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return infrastructureService;
    }
}
