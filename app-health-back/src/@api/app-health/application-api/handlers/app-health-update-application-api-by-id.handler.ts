import { AppHealthApplicationApiDto, AppHealthUpdateApplicationApiByIdDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthUpdateApplicationApiByIdInput } from '@api/graphql';
import { AppHealthFindApplicationApiByIdQuery, AppHealthUpdateApplicationApiByIdCommand } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationApiByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationApiByIdInput | AppHealthUpdateApplicationApiByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationApi | AppHealthApplicationApiDto>
    {
        const applicationApi = await this.queryBus.ask(new AppHealthFindApplicationApiByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationApi);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationApiByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationApiByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
