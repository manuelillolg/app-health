import { AppHealthApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { AppHealthDeleteApiInterfaceTypesCommand, AppHealthGetApiInterfaceTypesQuery } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApiInterfaceTypesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType[] | AppHealthApiInterfaceTypeDto[]>
    {
        const apiInterfaceTypes = await this.queryBus.ask(new AppHealthGetApiInterfaceTypesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApiInterfaceTypesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return apiInterfaceTypes;
    }
}
