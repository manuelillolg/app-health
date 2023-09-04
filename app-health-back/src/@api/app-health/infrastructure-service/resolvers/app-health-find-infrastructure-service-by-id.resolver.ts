import { AppHealthFindInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindInfrastructureServiceByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindInfrastructureServiceByIdHandler,
    ) {}

    @Query('appHealthFindInfrastructureServiceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
