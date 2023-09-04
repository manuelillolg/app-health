import { AppHealthApplicationInfrastructureServiceDto, AppHealthUpdateApplicationInfrastuctureServicesDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthUpdateApplicationInfrastuctureServicesInput } from '@api/graphql';
import { AppHealthGetApplicationInfrastuctureServicesQuery, AppHealthUpdateApplicationInfrastuctureServicesCommand } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationInfrastuctureServicesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationInfrastuctureServicesInput | AppHealthUpdateApplicationInfrastuctureServicesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService | AppHealthApplicationInfrastructureServiceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationInfrastuctureServicesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationInfrastuctureServicesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
