import { AppHealthApplicationDatabaseDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { AppHealthFindApplicationDatabaseByIdQuery } from '@app/app-health/application-database';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationDatabaseByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase | AppHealthApplicationDatabaseDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationDatabaseByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
