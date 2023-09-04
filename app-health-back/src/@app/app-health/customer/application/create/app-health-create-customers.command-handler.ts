/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateCustomersCommand } from './app-health-create-customers.command';
import { AppHealthCreateCustomersService } from './app-health-create-customers.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateCustomersCommand)
export class AppHealthCreateCustomersCommandHandler implements ICommandHandler<AppHealthCreateCustomersCommand>
{
    constructor(
        private readonly createCustomersService: AppHealthCreateCustomersService,
    ) {}

    async execute(command: AppHealthCreateCustomersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCustomersService.main(
            command.payload
                .map(customer =>
                {
                    return {
                        id: new AppHealthCustomerId(customer.id),
                        name: new AppHealthCustomerName(customer.name),
                    };
                }),
            command.cQMetadata,
        );
    }
}
