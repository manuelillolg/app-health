import { AppHealthCreateApplicationDto } from '@api/app-health/application';
import { AppHealthCreateApplicationInput } from '@api/graphql';
import { AppHealthCreateApplicationsCommand } from '@app/app-health/application';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationInput[] | AppHealthCreateApplicationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
