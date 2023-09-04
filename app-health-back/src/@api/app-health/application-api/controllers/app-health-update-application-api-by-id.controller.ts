/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthUpdateApplicationApiByIdDto, AppHealthUpdateApplicationApiByIdHandler } from '@api/app-health/application-api';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-api/update')
export class AppHealthUpdateApplicationApiByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationApiByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-api by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationApiDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationApiByIdDto,
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
