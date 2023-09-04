import { AppHealthAuthenticationInterfaceDto, AppHealthUpdateAuthenticationInterfacesDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthUpdateAuthenticationInterfacesInput } from '@api/graphql';
import { AppHealthGetAuthenticationInterfacesQuery, AppHealthUpdateAuthenticationInterfacesCommand } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateAuthenticationInterfacesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateAuthenticationInterfacesInput | AppHealthUpdateAuthenticationInterfacesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface | AppHealthAuthenticationInterfaceDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateAuthenticationInterfacesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetAuthenticationInterfacesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
