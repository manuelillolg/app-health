import { AppHealthApplicationAuthorizationDto, AppHealthUpdateApplicationAuthorizationByIdDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthUpdateApplicationAuthorizationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationAuthorizationByIdQuery, AppHealthUpsertApplicationAuthorizationCommand } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationAuthorizationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationAuthorizationByIdInput | AppHealthUpdateApplicationAuthorizationByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization | AppHealthApplicationAuthorizationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationAuthorizationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationAuthorizationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
