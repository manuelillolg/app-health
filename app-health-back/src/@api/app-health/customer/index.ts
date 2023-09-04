// export DTOs
export { AppHealthCustomerDto } from './dto/app-health-customer.dto';
export { AppHealthCreateCustomerDto } from './dto/app-health-create-customer.dto';
export { AppHealthUpdateCustomerByIdDto } from './dto/app-health-update-customer-by-id.dto';
export { AppHealthUpdateCustomersDto } from './dto/app-health-update-customers.dto';

// export handlers
export { AppHealthCreateCustomerHandler } from './handlers/app-health-create-customer.handler';
export { AppHealthCreateCustomersHandler } from './handlers/app-health-create-customers.handler';
export { AppHealthPaginateCustomersHandler } from './handlers/app-health-paginate-customers.handler';
export { AppHealthGetCustomersHandler } from './handlers/app-health-get-customers.handler';
export { AppHealthFindCustomerByIdHandler } from './handlers/app-health-find-customer-by-id.handler';
export { AppHealthFindCustomerHandler } from './handlers/app-health-find-customer.handler';
export { AppHealthUpdateCustomerByIdHandler } from './handlers/app-health-update-customer-by-id.handler';
export { AppHealthUpdateCustomersHandler } from './handlers/app-health-update-customers.handler';
export { AppHealthUpsertCustomerHandler } from './handlers/app-health-upsert-customer.handler';
export { AppHealthDeleteCustomerByIdHandler } from './handlers/app-health-delete-customer-by-id.handler';
export { AppHealthDeleteCustomersHandler } from './handlers/app-health-delete-customers.handler';

// export controllers
export { AppHealthCreateCustomerController } from './controllers/app-health-create-customer.controller';
export { AppHealthCreateCustomersController } from './controllers/app-health-create-customers.controller';
export { AppHealthPaginateCustomersController } from './controllers/app-health-paginate-customers.controller';
export { AppHealthGetCustomersController } from './controllers/app-health-get-customers.controller';
export { AppHealthFindCustomerByIdController } from './controllers/app-health-find-customer-by-id.controller';
export { AppHealthFindCustomerController } from './controllers/app-health-find-customer.controller';
export { AppHealthUpdateCustomerByIdController } from './controllers/app-health-update-customer-by-id.controller';
export { AppHealthUpdateCustomersController } from './controllers/app-health-update-customers.controller';
export { AppHealthUpsertCustomerController } from './controllers/app-health-upsert-customer.controller';
export { AppHealthDeleteCustomerByIdController } from './controllers/app-health-delete-customer-by-id.controller';
export { AppHealthDeleteCustomersController } from './controllers/app-health-delete-customers.controller';

// exports resolvers
export { AppHealthCreateCustomerResolver } from './resolvers/app-health-create-customer.resolver';
export { AppHealthCreateCustomersResolver } from './resolvers/app-health-create-customers.resolver';
export { AppHealthPaginateCustomersResolver } from './resolvers/app-health-paginate-customers.resolver';
export { AppHealthGetCustomersResolver } from './resolvers/app-health-get-customers.resolver';
export { AppHealthFindCustomerByIdResolver } from './resolvers/app-health-find-customer-by-id.resolver';
export { AppHealthFindCustomerResolver } from './resolvers/app-health-find-customer.resolver';
export { AppHealthUpdateCustomerByIdResolver } from './resolvers/app-health-update-customer-by-id.resolver';
export { AppHealthUpdateCustomersResolver } from './resolvers/app-health-update-customers.resolver';
export { AppHealthUpsertCustomerResolver } from './resolvers/app-health-upsert-customer.resolver';
export { AppHealthDeleteCustomerByIdResolver } from './resolvers/app-health-delete-customer-by-id.resolver';
export { AppHealthDeleteCustomersResolver } from './resolvers/app-health-delete-customers.resolver';

// controllers
import { AppHealthCreateCustomerController } from './controllers/app-health-create-customer.controller';
import { AppHealthCreateCustomersController } from './controllers/app-health-create-customers.controller';
import { AppHealthPaginateCustomersController } from './controllers/app-health-paginate-customers.controller';
import { AppHealthGetCustomersController } from './controllers/app-health-get-customers.controller';
import { AppHealthFindCustomerByIdController } from './controllers/app-health-find-customer-by-id.controller';
import { AppHealthFindCustomerController } from './controllers/app-health-find-customer.controller';
import { AppHealthUpdateCustomerByIdController } from './controllers/app-health-update-customer-by-id.controller';
import { AppHealthUpdateCustomersController } from './controllers/app-health-update-customers.controller';
import { AppHealthUpsertCustomerController } from './controllers/app-health-upsert-customer.controller';
import { AppHealthDeleteCustomerByIdController } from './controllers/app-health-delete-customer-by-id.controller';
import { AppHealthDeleteCustomersController } from './controllers/app-health-delete-customers.controller';

// resolvers
import { AppHealthCreateCustomerResolver } from './resolvers/app-health-create-customer.resolver';
import { AppHealthCreateCustomersResolver } from './resolvers/app-health-create-customers.resolver';
import { AppHealthPaginateCustomersResolver } from './resolvers/app-health-paginate-customers.resolver';
import { AppHealthGetCustomersResolver } from './resolvers/app-health-get-customers.resolver';
import { AppHealthFindCustomerByIdResolver } from './resolvers/app-health-find-customer-by-id.resolver';
import { AppHealthFindCustomerResolver } from './resolvers/app-health-find-customer.resolver';
import { AppHealthUpdateCustomerByIdResolver } from './resolvers/app-health-update-customer-by-id.resolver';
import { AppHealthUpdateCustomersResolver } from './resolvers/app-health-update-customers.resolver';
import { AppHealthUpsertCustomerResolver } from './resolvers/app-health-upsert-customer.resolver';
import { AppHealthDeleteCustomerByIdResolver } from './resolvers/app-health-delete-customer-by-id.resolver';
import { AppHealthDeleteCustomersResolver } from './resolvers/app-health-delete-customers.resolver';

// handlers
import { AppHealthCreateCustomerHandler } from './handlers/app-health-create-customer.handler';
import { AppHealthCreateCustomersHandler } from './handlers/app-health-create-customers.handler';
import { AppHealthPaginateCustomersHandler } from './handlers/app-health-paginate-customers.handler';
import { AppHealthGetCustomersHandler } from './handlers/app-health-get-customers.handler';
import { AppHealthFindCustomerByIdHandler } from './handlers/app-health-find-customer-by-id.handler';
import { AppHealthFindCustomerHandler } from './handlers/app-health-find-customer.handler';
import { AppHealthUpdateCustomerByIdHandler } from './handlers/app-health-update-customer-by-id.handler';
import { AppHealthUpdateCustomersHandler } from './handlers/app-health-update-customers.handler';
import { AppHealthUpsertCustomerHandler } from './handlers/app-health-upsert-customer.handler';
import { AppHealthDeleteCustomerByIdHandler } from './handlers/app-health-delete-customer-by-id.handler';
import { AppHealthDeleteCustomersHandler } from './handlers/app-health-delete-customers.handler';

// seeder
import { AppHealthCustomerSeeder } from './seeder/app-health-customer.seeder';

export const AppHealthCustomerControllers = [
    AppHealthCreateCustomerController,
    AppHealthCreateCustomersController,
    AppHealthPaginateCustomersController,
    AppHealthGetCustomersController,
    AppHealthFindCustomerByIdController,
    AppHealthFindCustomerController,
    AppHealthUpdateCustomerByIdController,
    AppHealthUpdateCustomersController,
    AppHealthUpsertCustomerController,
    AppHealthDeleteCustomerByIdController,
    AppHealthDeleteCustomersController,
];

export const AppHealthCustomerResolvers = [
    AppHealthCreateCustomerResolver,
    AppHealthCreateCustomersResolver,
    AppHealthPaginateCustomersResolver,
    AppHealthGetCustomersResolver,
    AppHealthFindCustomerByIdResolver,
    AppHealthFindCustomerResolver,
    AppHealthUpdateCustomerByIdResolver,
    AppHealthUpdateCustomersResolver,
    AppHealthUpsertCustomerResolver,
    AppHealthDeleteCustomerByIdResolver,
    AppHealthDeleteCustomersResolver,
];

export const AppHealthCustomerApiHandlers = [
    AppHealthCreateCustomerHandler,
    AppHealthCreateCustomersHandler,
    AppHealthPaginateCustomersHandler,
    AppHealthGetCustomersHandler,
    AppHealthFindCustomerByIdHandler,
    AppHealthFindCustomerHandler,
    AppHealthUpdateCustomerByIdHandler,
    AppHealthUpdateCustomersHandler,
    AppHealthUpsertCustomerHandler,
    AppHealthDeleteCustomerByIdHandler,
    AppHealthDeleteCustomersHandler,
];

export const AppHealthCustomerServices = [
    AppHealthCustomerSeeder,
];
