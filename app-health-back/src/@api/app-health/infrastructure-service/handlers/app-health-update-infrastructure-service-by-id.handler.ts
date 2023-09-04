import { AppHealthInfrastructureServiceDto, AppHealthUpdateInfrastructureServiceByIdDto } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService, AppHealthUpdateInfrastructureServiceByIdInput } from '@api/graphql';
import { AppHealthFindInfrastructureServiceByIdQuery, AppHealthUpdateInfrastructureServiceByIdCommand } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateInfrastructureServiceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateInfrastructureServiceByIdInput | AppHealthUpdateInfrastructureServiceByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthInfrastructureService | AppHealthInfrastructureServiceDto>
    {
        const infrastructureService = await this.queryBus.ask(new AppHealthFindInfrastructureServiceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, infrastructureService);

        await this.commandBus.dispatch(new AppHealthUpdateInfrastructureServiceByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindInfrastructureServiceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
