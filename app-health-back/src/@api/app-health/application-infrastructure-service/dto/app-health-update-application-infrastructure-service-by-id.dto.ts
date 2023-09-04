/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateApplicationInfrastructureServiceByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'applicationId [input here api field description]',
        example    : '209e8dce-ce93-5b3d-a4f3-06ce49207393',
    })
    applicationId?: string;

    @ApiProperty({
        type       : String,
        description: 'infrastructureServiceId [input here api field description]',
        example    : '9c69edd3-a09b-535b-a394-b702feb6c868',
    })
    infrastructureServiceId?: string;

    @ApiProperty({
        type       : Number,
        description: 'averageCostPerYear [input here api field description]',
    })
    averageCostPerYear?: number;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score?: number;

}
