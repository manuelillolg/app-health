import { AppHealthCreateApplicationViewDto } from '@api/app-health/application-view';
import { AppHealthCreateApplicationViewInput } from '@api/graphql';
import { AppHealthCreateApplicationViewsCommand } from '@app/app-health/application-view';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationViewsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationViewInput[] | AppHealthCreateApplicationViewDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationViewsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
