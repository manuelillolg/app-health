import { AppHealthApplicationViewDto, AppHealthCreateApplicationViewDto } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthCreateApplicationViewInput } from '@api/graphql';
import { AppHealthCreateApplicationViewCommand, AppHealthFindApplicationViewByIdQuery } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationViewHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationViewInput | AppHealthCreateApplicationViewDto,
        timezone?: string,
    ): Promise<AppHealthApplicationView | AppHealthApplicationViewDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationViewCommand(
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
