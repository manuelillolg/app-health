/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApiInterfaceTypeCommand } from './app-health-create-api-interface-type.command';
import { AppHealthCreateApiInterfaceTypeService } from './app-health-create-api-interface-type.service';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApiInterfaceTypeCommand)
export class AppHealthCreateApiInterfaceTypeCommandHandler implements ICommandHandler<AppHealthCreateApiInterfaceTypeCommand>
{
    constructor(
        private readonly createApiInterfaceTypeService: AppHealthCreateApiInterfaceTypeService,
    ) {}

    async execute(command: AppHealthCreateApiInterfaceTypeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApiInterfaceTypeService.main(
            {
                id: new AppHealthApiInterfaceTypeId(command.payload.id),
                name: new AppHealthApiInterfaceTypeName(command.payload.name),
                score: new AppHealthApiInterfaceTypeScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
