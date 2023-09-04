import { AppHealthUpsertApplicationLanguageHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthUpdateApplicationLanguageByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationLanguageResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationLanguageHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationLanguage')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationLanguageByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
