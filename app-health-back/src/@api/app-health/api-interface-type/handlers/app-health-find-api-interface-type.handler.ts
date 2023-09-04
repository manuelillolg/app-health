import { AppHealthApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { AppHealthFindApiInterfaceTypeQuery } from '@app/app-health/api-interface-type';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApiInterfaceTypeHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType | AppHealthApiInterfaceTypeDto>
    {
        return await this.queryBus.ask(new AppHealthFindApiInterfaceTypeQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
