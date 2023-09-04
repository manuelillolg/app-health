/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateApplicationApisDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'applicationId [input here api field description]',
        example    : '209e8dce-ce93-5b3d-a4f3-06ce49207393',
    })
    applicationId?: string;

    @ApiProperty({
        type       : String,
        description: 'apiInterfaceTypeId [input here api field description]',
        example    : '8b85608c-92e7-5a04-852e-5efe2826a905',
    })
    apiInterfaceTypeId?: string;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score?: number;

    @ApiProperty({
        type       : Object,
        description: 'documentations [input here api field description]',
    })
    documentations?: any;

    @ApiProperty({
        type       : Number,
        description: 'requestsPerDay [input here api field description]',
    })
    requestsPerDay?: number;

    @ApiProperty({
        type       : String,
        description: 'applicationInfrastructureServiceId [input here api field description]',
        example    : '4500f7d8-50e3-58a0-8426-7e7b78402710',
    })
    applicationInfrastructureServiceId?: string;

}
