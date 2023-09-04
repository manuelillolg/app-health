import { AppHealthApplicationDatabaseDto, AppHealthUpdateApplicationDatabaseByIdDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthUpdateApplicationDatabaseByIdInput } from '@api/graphql';
import { AppHealthFindApplicationDatabaseByIdQuery, AppHealthUpdateApplicationDatabaseByIdCommand } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationDatabaseByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationDatabaseByIdInput | AppHealthUpdateApplicationDatabaseByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase | AppHealthApplicationDatabaseDto>
    {
        const applicationDatabase = await this.queryBus.ask(new AppHealthFindApplicationDatabaseByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationDatabase);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationDatabaseByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationDatabaseByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
