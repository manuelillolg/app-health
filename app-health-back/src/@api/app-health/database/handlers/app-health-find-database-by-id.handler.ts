import { AppHealthDatabaseDto } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { AppHealthFindDatabaseByIdQuery } from '@app/app-health/database';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindDatabaseByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthDatabase | AppHealthDatabaseDto>
    {
        return await this.queryBus.ask(new AppHealthFindDatabaseByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
