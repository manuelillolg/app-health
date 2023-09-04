import { AppHealthApplicationDto, AppHealthUpdateApplicationByIdDto } from '@api/app-health/application';
import { AppHealthApplication, AppHealthUpdateApplicationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationByIdQuery, AppHealthUpsertApplicationCommand } from '@app/app-health/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationByIdInput | AppHealthUpdateApplicationByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplication | AppHealthApplicationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationCommand(
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
