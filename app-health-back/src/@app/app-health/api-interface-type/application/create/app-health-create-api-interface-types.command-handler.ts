/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApiInterfaceTypesCommand } from './app-health-create-api-interface-types.command';
import { AppHealthCreateApiInterfaceTypesService } from './app-health-create-api-interface-types.service';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApiInterfaceTypesCommand)
export class AppHealthCreateApiInterfaceTypesCommandHandler implements ICommandHandler<AppHealthCreateApiInterfaceTypesCommand>
{
    constructor(
        private readonly createApiInterfaceTypesService: AppHealthCreateApiInterfaceTypesService,
    ) {}

    async execute(command: AppHealthCreateApiInterfaceTypesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApiInterfaceTypesService.main(
            command.payload
                .map(apiInterfaceType =>
                {
                    return {
                        id: new AppHealthApiInterfaceTypeId(apiInterfaceType.id),
                        name: new AppHealthApiInterfaceTypeName(apiInterfaceType.name),
                        score: new AppHealthApiInterfaceTypeScore(apiInterfaceType.score),
                    };
                }),
            command.cQMetadata,
        );
    }
}
