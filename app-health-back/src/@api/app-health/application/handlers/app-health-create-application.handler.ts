import { AppHealthApplicationDto, AppHealthCreateApplicationDto } from '@api/app-health/application';
import { AppHealthApplication, AppHealthCreateApplicationInput } from '@api/graphql';
import { AppHealthCreateApplicationCommand, AppHealthFindApplicationByIdQuery } from '@app/app-health/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationInput | AppHealthCreateApplicationDto,
        timezone?: string,
    ): Promise<AppHealthApplication | AppHealthApplicationDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
