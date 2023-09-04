import { AppHealthApplicationAuthenticationDto, AppHealthUpdateApplicationAuthenticationByIdDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthUpdateApplicationAuthenticationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationAuthenticationByIdQuery, AppHealthUpdateApplicationAuthenticationByIdCommand } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationAuthenticationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationAuthenticationByIdInput | AppHealthUpdateApplicationAuthenticationByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication | AppHealthApplicationAuthenticationDto>
    {
        const applicationAuthentication = await this.queryBus.ask(new AppHealthFindApplicationAuthenticationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationAuthentication);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationAuthenticationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationAuthenticationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
