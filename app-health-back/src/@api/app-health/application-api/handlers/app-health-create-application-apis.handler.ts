import { AppHealthCreateApplicationApiDto } from '@api/app-health/application-api';
import { AppHealthCreateApplicationApiInput } from '@api/graphql';
import { AppHealthCreateApplicationApisCommand } from '@app/app-health/application-api';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationApisHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationApiInput[] | AppHealthCreateApplicationApiDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationApisCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
