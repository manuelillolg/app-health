/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthInfrastructureProviderDto, AppHealthUpdateInfrastructureProviderByIdDto, AppHealthUpdateInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-provider/update')
export class AppHealthUpdateInfrastructureProviderByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateInfrastructureProviderByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update infrastructure-provider by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthInfrastructureProviderDto })
    async main(
        @Body() payload: AppHealthUpdateInfrastructureProviderByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
