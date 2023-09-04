/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDto, AppHealthUpdateApplicationByIdDto, AppHealthUpdateApplicationByIdHandler } from '@api/app-health/application';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application')
@Controller('app-health/application/update')
export class AppHealthUpdateApplicationByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationByIdDto,
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
