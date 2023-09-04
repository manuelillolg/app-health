import { AppHealthApplicationDatabaseDto, AppHealthCreateApplicationDatabaseDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthCreateApplicationDatabaseInput } from '@api/graphql';
import { AppHealthCreateApplicationDatabaseCommand, AppHealthFindApplicationDatabaseByIdQuery } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationDatabaseHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationDatabaseInput | AppHealthCreateApplicationDatabaseDto,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase | AppHealthApplicationDatabaseDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationDatabaseCommand(
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
