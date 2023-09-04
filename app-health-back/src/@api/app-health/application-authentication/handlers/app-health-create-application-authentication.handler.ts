import { AppHealthApplicationAuthenticationDto, AppHealthCreateApplicationAuthenticationDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthCreateApplicationAuthenticationInput } from '@api/graphql';
import { AppHealthCreateApplicationAuthenticationCommand, AppHealthFindApplicationAuthenticationByIdQuery } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationAuthenticationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationAuthenticationInput | AppHealthCreateApplicationAuthenticationDto,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication | AppHealthApplicationAuthenticationDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationAuthenticationCommand(
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
