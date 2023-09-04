import { AppHealthApplicationLanguageDto, AppHealthUpdateApplicationLanguageByIdDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthUpdateApplicationLanguageByIdInput } from '@api/graphql';
import { AppHealthFindApplicationLanguageByIdQuery, AppHealthUpdateApplicationLanguageByIdCommand } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationLanguageByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationLanguageByIdInput | AppHealthUpdateApplicationLanguageByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage | AppHealthApplicationLanguageDto>
    {
        const applicationLanguage = await this.queryBus.ask(new AppHealthFindApplicationLanguageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationLanguage);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationLanguageByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationLanguageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
