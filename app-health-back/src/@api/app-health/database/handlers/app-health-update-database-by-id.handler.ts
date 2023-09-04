import { AppHealthDatabaseDto, AppHealthUpdateDatabaseByIdDto } from '@api/app-health/database';
import { AppHealthDatabase, AppHealthUpdateDatabaseByIdInput } from '@api/graphql';
import { AppHealthFindDatabaseByIdQuery, AppHealthUpdateDatabaseByIdCommand } from '@app/app-health/database';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateDatabaseByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateDatabaseByIdInput | AppHealthUpdateDatabaseByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthDatabase | AppHealthDatabaseDto>
    {
        const database = await this.queryBus.ask(new AppHealthFindDatabaseByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, database);

        await this.commandBus.dispatch(new AppHealthUpdateDatabaseByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindDatabaseByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
