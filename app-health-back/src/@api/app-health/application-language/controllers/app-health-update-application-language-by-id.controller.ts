/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthUpdateApplicationLanguageByIdDto, AppHealthUpdateApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-language/update')
export class AppHealthUpdateApplicationLanguageByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationLanguageByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-language by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationLanguageDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationLanguageByIdDto,
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
