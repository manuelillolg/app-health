import { AppHealthApplicationAuthorizationDto, AppHealthCreateApplicationAuthorizationDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthCreateApplicationAuthorizationInput } from '@api/graphql';
import { AppHealthCreateApplicationAuthorizationCommand, AppHealthFindApplicationAuthorizationByIdQuery } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationAuthorizationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationAuthorizationInput | AppHealthCreateApplicationAuthorizationDto,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization | AppHealthApplicationAuthorizationDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationAuthorizationCommand(
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
