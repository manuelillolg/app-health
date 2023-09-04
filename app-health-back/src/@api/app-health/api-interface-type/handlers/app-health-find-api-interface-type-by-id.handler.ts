import { AppHealthApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { AppHealthFindApiInterfaceTypeByIdQuery } from '@app/app-health/api-interface-type';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApiInterfaceTypeByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType | AppHealthApiInterfaceTypeDto>
    {
        return await this.queryBus.ask(new AppHealthFindApiInterfaceTypeByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
