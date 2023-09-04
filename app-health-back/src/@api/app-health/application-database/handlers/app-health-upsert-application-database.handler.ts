import { AppHealthApplicationDatabaseDto, AppHealthUpdateApplicationDatabaseByIdDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthUpdateApplicationDatabaseByIdInput } from '@api/graphql';
import { AppHealthFindApplicationDatabaseByIdQuery, AppHealthUpsertApplicationDatabaseCommand } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationDatabaseHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationDatabaseByIdInput | AppHealthUpdateApplicationDatabaseByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase | AppHealthApplicationDatabaseDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationDatabaseCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationDatabaseByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
