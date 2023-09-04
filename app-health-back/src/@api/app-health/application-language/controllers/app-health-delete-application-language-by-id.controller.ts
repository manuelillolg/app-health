/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthDeleteApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-language/delete')
export class AppHealthDeleteApplicationLanguageByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationLanguageByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-language by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationLanguageDto })
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
