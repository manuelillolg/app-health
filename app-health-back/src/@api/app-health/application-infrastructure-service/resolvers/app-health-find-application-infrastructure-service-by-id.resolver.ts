import { AppHealthFindApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationInfrastructureServiceByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationInfrastructureServiceByIdHandler,
    ) {}

    @Query('appHealthFindApplicationInfrastructureServiceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
