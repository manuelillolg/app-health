/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthFindLanguageByIdHandler, AppHealthLanguageDto } from '@api/app-health/language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/language/find')
export class AppHealthFindLanguageByIdController
{
    constructor(
        private readonly handler: AppHealthFindLanguageByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find language by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthLanguageDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
