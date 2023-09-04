import { AppHealthApiInterfaceTypeDto, AppHealthUpdateApiInterfaceTypeByIdDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthUpdateApiInterfaceTypeByIdInput } from '@api/graphql';
import { AppHealthFindApiInterfaceTypeByIdQuery, AppHealthUpsertApiInterfaceTypeCommand } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApiInterfaceTypeHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApiInterfaceTypeByIdInput | AppHealthUpdateApiInterfaceTypeByIdDto,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType | AppHealthApiInterfaceTypeDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApiInterfaceTypeCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApiInterfaceTypeByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
