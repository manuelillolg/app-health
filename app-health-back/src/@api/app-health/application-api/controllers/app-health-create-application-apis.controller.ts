/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthCreateApplicationApiDto, AppHealthCreateApplicationApisHandler } from '@api/app-health/application-api';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-apis/create')
export class AppHealthCreateApplicationApisController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationApisHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-apis in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationApiDto]})
    @ApiBody({ type: [AppHealthCreateApplicationApiDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationApiDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
