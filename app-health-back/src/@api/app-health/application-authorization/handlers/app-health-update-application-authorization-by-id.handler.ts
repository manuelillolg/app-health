import { AppHealthApplicationAuthorizationDto, AppHealthUpdateApplicationAuthorizationByIdDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthUpdateApplicationAuthorizationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationAuthorizationByIdQuery, AppHealthUpdateApplicationAuthorizationByIdCommand } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationAuthorizationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationAuthorizationByIdInput | AppHealthUpdateApplicationAuthorizationByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization | AppHealthApplicationAuthorizationDto>
    {
        const applicationAuthorization = await this.queryBus.ask(new AppHealthFindApplicationAuthorizationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationAuthorization);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationAuthorizationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationAuthorizationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
