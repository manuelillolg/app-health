/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateApplicationAuthorizationByIdDto
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
        description: 'authorizationInterfaceId [input here api field description]',
        example    : 'e5389079-74e5-538a-b05c-ddd5a25cce51',
    })
    authorizationInterfaceId?: string;

    @ApiProperty({
        type       : Number,
        description: 'totalUsers [input here api field description]',
    })
    totalUsers?: number;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score?: number;

    @ApiProperty({
        type       : String,
        description: 'applicationInfrastructureServiceId [input here api field description]',
        example    : '4500f7d8-50e3-58a0-8426-7e7b78402710',
    })
    applicationInfrastructureServiceId?: string;

}
