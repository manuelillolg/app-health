/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateCustomerCommand } from './app-health-create-customer.command';
import { AppHealthCreateCustomerService } from './app-health-create-customer.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateCustomerCommand)
export class AppHealthCreateCustomerCommandHandler implements ICommandHandler<AppHealthCreateCustomerCommand>
{
    constructor(
        private readonly createCustomerService: AppHealthCreateCustomerService,
    ) {}

    async execute(command: AppHealthCreateCustomerCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCustomerService.main(
            {
                id: new AppHealthCustomerId(command.payload.id),
                name: new AppHealthCustomerName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}
