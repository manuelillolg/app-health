/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthTechnicalSolutionDto, AppHealthUpdateTechnicalSolutionByIdDto, AppHealthUpsertTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solution/upsert')
export class AppHealthUpsertTechnicalSolutionController
{
    constructor(
        private readonly handler: AppHealthUpsertTechnicalSolutionHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert technical-solution' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthTechnicalSolutionDto })
    async main(
        @Body() payload: AppHealthUpdateTechnicalSolutionByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
