import { AppHealthApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { AppHealthGetApiInterfaceTypesQuery } from '@app/app-health/api-interface-type';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetApiInterfaceTypesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType[] | AppHealthApiInterfaceTypeDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetApiInterfaceTypesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
