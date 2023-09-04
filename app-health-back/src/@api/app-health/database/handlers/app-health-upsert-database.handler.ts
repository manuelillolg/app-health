import { AppHealthDatabaseDto, AppHealthUpdateDatabaseByIdDto } from '@api/app-health/database';
import { AppHealthDatabase, AppHealthUpdateDatabaseByIdInput } from '@api/graphql';
import { AppHealthFindDatabaseByIdQuery, AppHealthUpsertDatabaseCommand } from '@app/app-health/database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertDatabaseHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateDatabaseByIdInput | AppHealthUpdateDatabaseByIdDto,
        timezone?: string,
    ): Promise<AppHealthDatabase | AppHealthDatabaseDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertDatabaseCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindDatabaseByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
