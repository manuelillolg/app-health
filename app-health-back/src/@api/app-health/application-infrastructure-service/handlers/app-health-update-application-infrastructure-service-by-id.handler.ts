import { AppHealthApplicationInfrastructureServiceDto, AppHealthUpdateApplicationInfrastructureServiceByIdDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthUpdateApplicationInfrastructureServiceByIdInput } from '@api/graphql';
import { AppHealthFindApplicationInfrastructureServiceByIdQuery, AppHealthUpdateApplicationInfrastructureServiceByIdCommand } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationInfrastructureServiceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationInfrastructureServiceByIdInput | AppHealthUpdateApplicationInfrastructureServiceByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService | AppHealthApplicationInfrastructureServiceDto>
    {
        const applicationInfrastructureService = await this.queryBus.ask(new AppHealthFindApplicationInfrastructureServiceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationInfrastructureService);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationInfrastructureServiceByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationInfrastructureServiceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
