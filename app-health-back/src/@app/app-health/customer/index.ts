// export commands
export { AppHealthCreateCustomerCommand } from './application/create/app-health-create-customer.command';
export { AppHealthCreateCustomersCommand } from './application/create/app-health-create-customers.command';
export { AppHealthUpdateCustomerByIdCommand } from './application/update/app-health-update-customer-by-id.command';
export { AppHealthUpdateCustomersCommand } from './application/update/app-health-update-customers.command';
export { AppHealthUpsertCustomerCommand } from './application/upsert/app-health-upsert-customer.command';
export { AppHealthDeleteCustomerByIdCommand } from './application/delete/app-health-delete-customer-by-id.command';
export { AppHealthDeleteCustomersCommand } from './application/delete/app-health-delete-customers.command';

// export queries
export { AppHealthPaginateCustomersQuery } from './application/paginate/app-health-paginate-customers.query';
export { AppHealthGetCustomersQuery } from './application/get/app-health-get-customers.query';
export { AppHealthFindCustomerQuery } from './application/find/app-health-find-customer.query';
export { AppHealthFindCustomerByIdQuery } from './application/find/app-health-find-customer-by-id.query';
export { AppHealthRawSQLCustomersQuery } from './application/raw-sql/app-health-raw-sql-customers.query';

// export mocks
export { appHealthMockCustomerData } from './infrastructure/mock/app-health-mock-customer.data';
export { AppHealthMockCustomerSeeder } from './infrastructure/mock/app-health-mock-customer.seeder';
export { AppHealthMockCustomerRepository } from './infrastructure/mock/app-health-mock-customer.repository';

// export events
export { AppHealthAddCustomersContextEvent } from './application/events/app-health-add-customers-context.event';
export { AppHealthCreatedCustomersEvent } from './application/events/app-health-created-customers.event';
export { AppHealthCreatedCustomerEvent } from './application/events/app-health-created-customer.event';
export { AppHealthDeletedCustomersEvent } from './application/events/app-health-deleted-customers.event';
export { AppHealthDeletedCustomerEvent } from './application/events/app-health-deleted-customer.event';
export { AppHealthUpdatedCustomersEvent } from './application/events/app-health-updated-customers.event';
export { AppHealthUpdatedCustomerEvent } from './application/events/app-health-updated-customer.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { AppHealthCustomer } from './domain/app-health-customer.aggregate';
export { AppHealthCustomerMapper } from './domain/app-health-customer.mapper';
export { AppHealthICustomerRepository } from './domain/app-health-customer.repository';
export { AppHealthCustomerResponse } from './domain/app-health-customer.response';

// infrastructure
export { AppHealthCustomerModel } from './infrastructure/sequelize/app-health-sequelize-customer.model';
export { AppHealthSequelizeCustomerRepository } from './infrastructure/sequelize/app-health-sequelize-customer.repository';

// sagas
export { AppHealthCustomerSagas } from './application/sagas/app-health-customer.sagas';

// command handlers
import { AppHealthCreateCustomerCommandHandler } from './application/create/app-health-create-customer.command-handler';
import { AppHealthCreateCustomersCommandHandler } from './application/create/app-health-create-customers.command-handler';
import { AppHealthUpdateCustomerByIdCommandHandler } from './application/update/app-health-update-customer-by-id.command-handler';
import { AppHealthUpdateCustomersCommandHandler } from './application/update/app-health-update-customers.command-handler';
import { AppHealthUpsertCustomerCommandHandler } from './application/upsert/app-health-upsert-customer.command-handler';
import { AppHealthDeleteCustomerByIdCommandHandler } from './application/delete/app-health-delete-customer-by-id.command-handler';
import { AppHealthDeleteCustomersCommandHandler } from './application/delete/app-health-delete-customers.command-handler';

// query handlers
import { AppHealthPaginateCustomersQueryHandler } from './application/paginate/app-health-paginate-customers.query-handler';
import { AppHealthGetCustomersQueryHandler } from './application/get/app-health-get-customers.query-handler';
import { AppHealthFindCustomerQueryHandler } from './application/find/app-health-find-customer.query-handler';
import { AppHealthFindCustomerByIdQueryHandler } from './application/find/app-health-find-customer-by-id.query-handler';
import { AppHealthRawSQLCustomersQueryHandler } from './application/raw-sql/app-health-raw-sql-customers.query-handler';

// event handlers
import { AppHealthCreatedCustomerEventHandler } from './application/events/app-health-created-customer.event-handler';
import { AppHealthCreatedCustomersEventHandler } from './application/events/app-health-created-customers.event-handler';
import { AppHealthUpdatedCustomerEventHandler } from './application/events/app-health-updated-customer.event-handler';
import { AppHealthUpdatedCustomersEventHandler } from './application/events/app-health-updated-customers.event-handler';
import { AppHealthDeletedCustomerEventHandler } from './application/events/app-health-deleted-customer.event-handler';
import { AppHealthDeletedCustomersEventHandler } from './application/events/app-health-deleted-customers.event-handler';

// services
import { AppHealthCreateCustomerService } from './application/create/app-health-create-customer.service';
import { AppHealthCreateCustomersService } from './application/create/app-health-create-customers.service';
import { AppHealthPaginateCustomersService } from './application/paginate/app-health-paginate-customers.service';
import { AppHealthGetCustomersService } from './application/get/app-health-get-customers.service';
import { AppHealthFindCustomerService } from './application/find/app-health-find-customer.service';
import { AppHealthFindCustomerByIdService } from './application/find/app-health-find-customer-by-id.service';
import { AppHealthRawSQLCustomersService } from './application/raw-sql/app-health-raw-sql-customers.service';
import { AppHealthUpdateCustomerByIdService } from './application/update/app-health-update-customer-by-id.service';
import { AppHealthUpdateCustomersService } from './application/update/app-health-update-customers.service';
import { AppHealthUpsertCustomerService } from './application/upsert/app-health-upsert-customer.service';
import { AppHealthDeleteCustomerByIdService } from './application/delete/app-health-delete-customer-by-id.service';
import { AppHealthDeleteCustomersService } from './application/delete/app-health-delete-customers.service';

export const AppHealthCustomerHandlers = [
    // commands
    AppHealthCreateCustomerCommandHandler,
    AppHealthCreateCustomersCommandHandler,
    AppHealthUpdateCustomerByIdCommandHandler,
    AppHealthUpdateCustomersCommandHandler,
    AppHealthUpsertCustomerCommandHandler,
    AppHealthDeleteCustomerByIdCommandHandler,
    AppHealthDeleteCustomersCommandHandler,

    // queries
    AppHealthPaginateCustomersQueryHandler,
    AppHealthGetCustomersQueryHandler,
    AppHealthFindCustomerQueryHandler,
    AppHealthFindCustomerByIdQueryHandler,
    AppHealthRawSQLCustomersQueryHandler,

    // events
    AppHealthCreatedCustomerEventHandler,
    AppHealthCreatedCustomersEventHandler,
    AppHealthUpdatedCustomerEventHandler,
    AppHealthUpdatedCustomersEventHandler,
    AppHealthDeletedCustomerEventHandler,
    AppHealthDeletedCustomersEventHandler,
];

export const AppHealthCustomerServices = [
    AppHealthCreateCustomerService,
    AppHealthCreateCustomersService,
    AppHealthPaginateCustomersService,
    AppHealthGetCustomersService,
    AppHealthFindCustomerService,
    AppHealthFindCustomerByIdService,
    AppHealthRawSQLCustomersService,
    AppHealthUpdateCustomerByIdService,
    AppHealthUpdateCustomersService,
    AppHealthUpsertCustomerService,
    AppHealthDeleteCustomerByIdService,
    AppHealthDeleteCustomersService,
];