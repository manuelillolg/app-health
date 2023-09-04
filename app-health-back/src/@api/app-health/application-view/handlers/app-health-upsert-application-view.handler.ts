import { AppHealthApplicationViewDto, AppHealthUpdateApplicationViewByIdDto } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthUpdateApplicationViewByIdInput } from '@api/graphql';
import { AppHealthFindApplicationViewByIdQuery, AppHealthUpsertApplicationViewCommand } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationViewHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationViewByIdInput | AppHealthUpdateApplicationViewByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationView | AppHealthApplicationViewDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationViewCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationViewByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
