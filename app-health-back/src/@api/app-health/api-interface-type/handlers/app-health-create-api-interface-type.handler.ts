import { AppHealthApiInterfaceTypeDto, AppHealthCreateApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthCreateApiInterfaceTypeInput } from '@api/graphql';
import { AppHealthCreateApiInterfaceTypeCommand, AppHealthFindApiInterfaceTypeByIdQuery } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApiInterfaceTypeHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApiInterfaceTypeInput | AppHealthCreateApiInterfaceTypeDto,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType | AppHealthApiInterfaceTypeDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApiInterfaceTypeCommand(
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
