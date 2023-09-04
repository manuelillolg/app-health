import { AppHealthApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { AppHealthDeleteApiInterfaceTypeByIdCommand, AppHealthFindApiInterfaceTypeByIdQuery } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApiInterfaceTypeByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType | AppHealthApiInterfaceTypeDto>
    {
        const apiInterfaceType = await this.queryBus.ask(new AppHealthFindApiInterfaceTypeByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApiInterfaceTypeByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return apiInterfaceType;
    }
}
