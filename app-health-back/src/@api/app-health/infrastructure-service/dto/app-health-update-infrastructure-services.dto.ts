/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateInfrastructureServicesDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'providerId [input here api field description]',
        example    : '385a973c-32a8-58b1-825b-ccf5ee1e5c65',
    })
    providerId?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score?: number;

}
