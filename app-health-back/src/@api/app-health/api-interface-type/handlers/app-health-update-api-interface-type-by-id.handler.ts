import { AppHealthApiInterfaceTypeDto, AppHealthUpdateApiInterfaceTypeByIdDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthUpdateApiInterfaceTypeByIdInput } from '@api/graphql';
import { AppHealthFindApiInterfaceTypeByIdQuery, AppHealthUpdateApiInterfaceTypeByIdCommand } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApiInterfaceTypeByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApiInterfaceTypeByIdInput | AppHealthUpdateApiInterfaceTypeByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType | AppHealthApiInterfaceTypeDto>
    {
        const apiInterfaceType = await this.queryBus.ask(new AppHealthFindApiInterfaceTypeByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, apiInterfaceType);

        await this.commandBus.dispatch(new AppHealthUpdateApiInterfaceTypeByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApiInterfaceTypeByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
