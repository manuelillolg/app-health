// export DTOs
export { AppHealthApplicationDto } from './dto/app-health-application.dto';
export { AppHealthCreateApplicationDto } from './dto/app-health-create-application.dto';
export { AppHealthUpdateApplicationByIdDto } from './dto/app-health-update-application-by-id.dto';
export { AppHealthUpdateApplicationsDto } from './dto/app-health-update-applications.dto';

// export handlers
export { AppHealthCreateApplicationHandler } from './handlers/app-health-create-application.handler';
export { AppHealthCreateApplicationsHandler } from './handlers/app-health-create-applications.handler';
export { AppHealthPaginateApplicationsHandler } from './handlers/app-health-paginate-applications.handler';
export { AppHealthGetApplicationsHandler } from './handlers/app-health-get-applications.handler';
export { AppHealthFindApplicationByIdHandler } from './handlers/app-health-find-application-by-id.handler';
export { AppHealthFindApplicationHandler } from './handlers/app-health-find-application.handler';
export { AppHealthUpdateApplicationByIdHandler } from './handlers/app-health-update-application-by-id.handler';
export { AppHealthUpdateApplicationsHandler } from './handlers/app-health-update-applications.handler';
export { AppHealthUpsertApplicationHandler } from './handlers/app-health-upsert-application.handler';
export { AppHealthDeleteApplicationByIdHandler } from './handlers/app-health-delete-application-by-id.handler';
export { AppHealthDeleteApplicationsHandler } from './handlers/app-health-delete-applications.handler';

// export controllers
export { AppHealthCreateApplicationController } from './controllers/app-health-create-application.controller';
export { AppHealthCreateApplicationsController } from './controllers/app-health-create-applications.controller';
export { AppHealthPaginateApplicationsController } from './controllers/app-health-paginate-applications.controller';
export { AppHealthGetApplicationsController } from './controllers/app-health-get-applications.controller';
export { AppHealthFindApplicationByIdController } from './controllers/app-health-find-application-by-id.controller';
export { AppHealthFindApplicationController } from './controllers/app-health-find-application.controller';
export { AppHealthUpdateApplicationByIdController } from './controllers/app-health-update-application-by-id.controller';
export { AppHealthUpdateApplicationsController } from './controllers/app-health-update-applications.controller';
export { AppHealthUpsertApplicationController } from './controllers/app-health-upsert-application.controller';
export { AppHealthDeleteApplicationByIdController } from './controllers/app-health-delete-application-by-id.controller';
export { AppHealthDeleteApplicationsController } from './controllers/app-health-delete-applications.controller';

// exports resolvers
export { AppHealthCreateApplicationResolver } from './resolvers/app-health-create-application.resolver';
export { AppHealthCreateApplicationsResolver } from './resolvers/app-health-create-applications.resolver';
export { AppHealthPaginateApplicationsResolver } from './resolvers/app-health-paginate-applications.resolver';
export { AppHealthGetApplicationsResolver } from './resolvers/app-health-get-applications.resolver';
export { AppHealthFindApplicationByIdResolver } from './resolvers/app-health-find-application-by-id.resolver';
export { AppHealthFindApplicationResolver } from './resolvers/app-health-find-application.resolver';
export { AppHealthUpdateApplicationByIdResolver } from './resolvers/app-health-update-application-by-id.resolver';
export { AppHealthUpdateApplicationsResolver } from './resolvers/app-health-update-applications.resolver';
export { AppHealthUpsertApplicationResolver } from './resolvers/app-health-upsert-application.resolver';
export { AppHealthDeleteApplicationByIdResolver } from './resolvers/app-health-delete-application-by-id.resolver';
export { AppHealthDeleteApplicationsResolver } from './resolvers/app-health-delete-applications.resolver';

// controllers
import { AppHealthCreateApplicationController } from './controllers/app-health-create-application.controller';
import { AppHealthCreateApplicationsController } from './controllers/app-health-create-applications.controller';
import { AppHealthPaginateApplicationsController } from './controllers/app-health-paginate-applications.controller';
import { AppHealthGetApplicationsController } from './controllers/app-health-get-applications.controller';
import { AppHealthFindApplicationByIdController } from './controllers/app-health-find-application-by-id.controller';
import { AppHealthFindApplicationController } from './controllers/app-health-find-application.controller';
import { AppHealthUpdateApplicationByIdController } from './controllers/app-health-update-application-by-id.controller';
import { AppHealthUpdateApplicationsController } from './controllers/app-health-update-applications.controller';
import { AppHealthUpsertApplicationController } from './controllers/app-health-upsert-application.controller';
import { AppHealthDeleteApplicationByIdController } from './controllers/app-health-delete-application-by-id.controller';
import { AppHealthDeleteApplicationsController } from './controllers/app-health-delete-applications.controller';

// resolvers
import { AppHealthCreateApplicationResolver } from './resolvers/app-health-create-application.resolver';
import { AppHealthCreateApplicationsResolver } from './resolvers/app-health-create-applications.resolver';
import { AppHealthPaginateApplicationsResolver } from './resolvers/app-health-paginate-applications.resolver';
import { AppHealthGetApplicationsResolver } from './resolvers/app-health-get-applications.resolver';
import { AppHealthFindApplicationByIdResolver } from './resolvers/app-health-find-application-by-id.resolver';
import { AppHealthFindApplicationResolver } from './resolvers/app-health-find-application.resolver';
import { AppHealthUpdateApplicationByIdResolver } from './resolvers/app-health-update-application-by-id.resolver';
import { AppHealthUpdateApplicationsResolver } from './resolvers/app-health-update-applications.resolver';
import { AppHealthUpsertApplicationResolver } from './resolvers/app-health-upsert-application.resolver';
import { AppHealthDeleteApplicationByIdResolver } from './resolvers/app-health-delete-application-by-id.resolver';
import { AppHealthDeleteApplicationsResolver } from './resolvers/app-health-delete-applications.resolver';

// handlers
import { AppHealthCreateApplicationHandler } from './handlers/app-health-create-application.handler';
import { AppHealthCreateApplicationsHandler } from './handlers/app-health-create-applications.handler';
import { AppHealthPaginateApplicationsHandler } from './handlers/app-health-paginate-applications.handler';
import { AppHealthGetApplicationsHandler } from './handlers/app-health-get-applications.handler';
import { AppHealthFindApplicationByIdHandler } from './handlers/app-health-find-application-by-id.handler';
import { AppHealthFindApplicationHandler } from './handlers/app-health-find-application.handler';
import { AppHealthUpdateApplicationByIdHandler } from './handlers/app-health-update-application-by-id.handler';
import { AppHealthUpdateApplicationsHandler } from './handlers/app-health-update-applications.handler';
import { AppHealthUpsertApplicationHandler } from './handlers/app-health-upsert-application.handler';
import { AppHealthDeleteApplicationByIdHandler } from './handlers/app-health-delete-application-by-id.handler';
import { AppHealthDeleteApplicationsHandler } from './handlers/app-health-delete-applications.handler';

// seeder
import { AppHealthApplicationSeeder } from './seeder/app-health-application.seeder';

export const AppHealthApplicationControllers = [
    AppHealthCreateApplicationController,
    AppHealthCreateApplicationsController,
    AppHealthPaginateApplicationsController,
    AppHealthGetApplicationsController,
    AppHealthFindApplicationByIdController,
    AppHealthFindApplicationController,
    AppHealthUpdateApplicationByIdController,
    AppHealthUpdateApplicationsController,
    AppHealthUpsertApplicationController,
    AppHealthDeleteApplicationByIdController,
    AppHealthDeleteApplicationsController,
];

export const AppHealthApplicationResolvers = [
    AppHealthCreateApplicationResolver,
    AppHealthCreateApplicationsResolver,
    AppHealthPaginateApplicationsResolver,
    AppHealthGetApplicationsResolver,
    AppHealthFindApplicationByIdResolver,
    AppHealthFindApplicationResolver,
    AppHealthUpdateApplicationByIdResolver,
    AppHealthUpdateApplicationsResolver,
    AppHealthUpsertApplicationResolver,
    AppHealthDeleteApplicationByIdResolver,
    AppHealthDeleteApplicationsResolver,
];

export const AppHealthApplicationApiHandlers = [
    AppHealthCreateApplicationHandler,
    AppHealthCreateApplicationsHandler,
    AppHealthPaginateApplicationsHandler,
    AppHealthGetApplicationsHandler,
    AppHealthFindApplicationByIdHandler,
    AppHealthFindApplicationHandler,
    AppHealthUpdateApplicationByIdHandler,
    AppHealthUpdateApplicationsHandler,
    AppHealthUpsertApplicationHandler,
    AppHealthDeleteApplicationByIdHandler,
    AppHealthDeleteApplicationsHandler,
];

export const AppHealthApplicationServices = [
    AppHealthApplicationSeeder,
];
