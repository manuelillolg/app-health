import { AppHealthApplicationApiDto, AppHealthCreateApplicationApiDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthCreateApplicationApiInput } from '@api/graphql';
import { AppHealthCreateApplicationApiCommand, AppHealthFindApplicationApiByIdQuery } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationApiHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationApiInput | AppHealthCreateApplicationApiDto,
        timezone?: string,
    ): Promise<AppHealthApplicationApi | AppHealthApplicationApiDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationApiCommand(
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
