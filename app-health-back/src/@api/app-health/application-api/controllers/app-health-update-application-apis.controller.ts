/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthUpdateApplicationApisDto, AppHealthUpdateApplicationApisHandler } from '@api/app-health/application-api';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-apis/update')
export class AppHealthUpdateApplicationApisController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationApisHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-apis' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationApiDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationApisDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
