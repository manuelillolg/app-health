import { AppHealthApplicationAuthenticationDto, AppHealthUpdateApplicationAuthenticationByIdDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthUpdateApplicationAuthenticationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationAuthenticationByIdQuery, AppHealthUpsertApplicationAuthenticationCommand } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationAuthenticationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationAuthenticationByIdInput | AppHealthUpdateApplicationAuthenticationByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication | AppHealthApplicationAuthenticationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationAuthenticationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationAuthenticationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
