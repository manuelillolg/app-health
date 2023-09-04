import { AppHealthFindApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationLanguageByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationLanguageByIdHandler,
    ) {}

    @Query('appHealthFindApplicationLanguageById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
