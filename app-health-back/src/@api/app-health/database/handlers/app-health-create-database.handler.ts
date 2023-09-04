import { AppHealthCreateDatabaseDto, AppHealthDatabaseDto } from '@api/app-health/database';
import { AppHealthCreateDatabaseInput, AppHealthDatabase } from '@api/graphql';
import { AppHealthCreateDatabaseCommand, AppHealthFindDatabaseByIdQuery } from '@app/app-health/database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateDatabaseHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateDatabaseInput | AppHealthCreateDatabaseDto,
        timezone?: string,
    ): Promise<AppHealthDatabase | AppHealthDatabaseDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateDatabaseCommand(
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
