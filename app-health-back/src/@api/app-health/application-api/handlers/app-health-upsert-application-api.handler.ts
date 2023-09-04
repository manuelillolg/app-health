import { AppHealthApplicationApiDto, AppHealthUpdateApplicationApiByIdDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthUpdateApplicationApiByIdInput } from '@api/graphql';
import { AppHealthFindApplicationApiByIdQuery, AppHealthUpsertApplicationApiCommand } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationApiHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationApiByIdInput | AppHealthUpdateApplicationApiByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationApi | AppHealthApplicationApiDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationApiCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationApiByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
