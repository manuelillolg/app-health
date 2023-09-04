// export DTOs
export { AppHealthLanguageDto } from './dto/app-health-language.dto';
export { AppHealthCreateLanguageDto } from './dto/app-health-create-language.dto';
export { AppHealthUpdateLanguageByIdDto } from './dto/app-health-update-language-by-id.dto';
export { AppHealthUpdateLanguagesDto } from './dto/app-health-update-languages.dto';

// export handlers
export { AppHealthCreateLanguageHandler } from './handlers/app-health-create-language.handler';
export { AppHealthCreateLanguagesHandler } from './handlers/app-health-create-languages.handler';
export { AppHealthPaginateLanguagesHandler } from './handlers/app-health-paginate-languages.handler';
export { AppHealthGetLanguagesHandler } from './handlers/app-health-get-languages.handler';
export { AppHealthFindLanguageByIdHandler } from './handlers/app-health-find-language-by-id.handler';
export { AppHealthFindLanguageHandler } from './handlers/app-health-find-language.handler';
export { AppHealthUpdateLanguageByIdHandler } from './handlers/app-health-update-language-by-id.handler';
export { AppHealthUpdateLanguagesHandler } from './handlers/app-health-update-languages.handler';
export { AppHealthUpsertLanguageHandler } from './handlers/app-health-upsert-language.handler';
export { AppHealthDeleteLanguageByIdHandler } from './handlers/app-health-delete-language-by-id.handler';
export { AppHealthDeleteLanguagesHandler } from './handlers/app-health-delete-languages.handler';

// export controllers
export { AppHealthCreateLanguageController } from './controllers/app-health-create-language.controller';
export { AppHealthCreateLanguagesController } from './controllers/app-health-create-languages.controller';
export { AppHealthPaginateLanguagesController } from './controllers/app-health-paginate-languages.controller';
export { AppHealthGetLanguagesController } from './controllers/app-health-get-languages.controller';
export { AppHealthFindLanguageByIdController } from './controllers/app-health-find-language-by-id.controller';
export { AppHealthFindLanguageController } from './controllers/app-health-find-language.controller';
export { AppHealthUpdateLanguageByIdController } from './controllers/app-health-update-language-by-id.controller';
export { AppHealthUpdateLanguagesController } from './controllers/app-health-update-languages.controller';
export { AppHealthUpsertLanguageController } from './controllers/app-health-upsert-language.controller';
export { AppHealthDeleteLanguageByIdController } from './controllers/app-health-delete-language-by-id.controller';
export { AppHealthDeleteLanguagesController } from './controllers/app-health-delete-languages.controller';

// exports resolvers
export { AppHealthCreateLanguageResolver } from './resolvers/app-health-create-language.resolver';
export { AppHealthCreateLanguagesResolver } from './resolvers/app-health-create-languages.resolver';
export { AppHealthPaginateLanguagesResolver } from './resolvers/app-health-paginate-languages.resolver';
export { AppHealthGetLanguagesResolver } from './resolvers/app-health-get-languages.resolver';
export { AppHealthFindLanguageByIdResolver } from './resolvers/app-health-find-language-by-id.resolver';
export { AppHealthFindLanguageResolver } from './resolvers/app-health-find-language.resolver';
export { AppHealthUpdateLanguageByIdResolver } from './resolvers/app-health-update-language-by-id.resolver';
export { AppHealthUpdateLanguagesResolver } from './resolvers/app-health-update-languages.resolver';
export { AppHealthUpsertLanguageResolver } from './resolvers/app-health-upsert-language.resolver';
export { AppHealthDeleteLanguageByIdResolver } from './resolvers/app-health-delete-language-by-id.resolver';
export { AppHealthDeleteLanguagesResolver } from './resolvers/app-health-delete-languages.resolver';

// controllers
import { AppHealthCreateLanguageController } from './controllers/app-health-create-language.controller';
import { AppHealthCreateLanguagesController } from './controllers/app-health-create-languages.controller';
import { AppHealthPaginateLanguagesController } from './controllers/app-health-paginate-languages.controller';
import { AppHealthGetLanguagesController } from './controllers/app-health-get-languages.controller';
import { AppHealthFindLanguageByIdController } from './controllers/app-health-find-language-by-id.controller';
import { AppHealthFindLanguageController } from './controllers/app-health-find-language.controller';
import { AppHealthUpdateLanguageByIdController } from './controllers/app-health-update-language-by-id.controller';
import { AppHealthUpdateLanguagesController } from './controllers/app-health-update-languages.controller';
import { AppHealthUpsertLanguageController } from './controllers/app-health-upsert-language.controller';
import { AppHealthDeleteLanguageByIdController } from './controllers/app-health-delete-language-by-id.controller';
import { AppHealthDeleteLanguagesController } from './controllers/app-health-delete-languages.controller';

// resolvers
import { AppHealthCreateLanguageResolver } from './resolvers/app-health-create-language.resolver';
import { AppHealthCreateLanguagesResolver } from './resolvers/app-health-create-languages.resolver';
import { AppHealthPaginateLanguagesResolver } from './resolvers/app-health-paginate-languages.resolver';
import { AppHealthGetLanguagesResolver } from './resolvers/app-health-get-languages.resolver';
import { AppHealthFindLanguageByIdResolver } from './resolvers/app-health-find-language-by-id.resolver';
import { AppHealthFindLanguageResolver } from './resolvers/app-health-find-language.resolver';
import { AppHealthUpdateLanguageByIdResolver } from './resolvers/app-health-update-language-by-id.resolver';
import { AppHealthUpdateLanguagesResolver } from './resolvers/app-health-update-languages.resolver';
import { AppHealthUpsertLanguageResolver } from './resolvers/app-health-upsert-language.resolver';
import { AppHealthDeleteLanguageByIdResolver } from './resolvers/app-health-delete-language-by-id.resolver';
import { AppHealthDeleteLanguagesResolver } from './resolvers/app-health-delete-languages.resolver';

// handlers
import { AppHealthCreateLanguageHandler } from './handlers/app-health-create-language.handler';
import { AppHealthCreateLanguagesHandler } from './handlers/app-health-create-languages.handler';
import { AppHealthPaginateLanguagesHandler } from './handlers/app-health-paginate-languages.handler';
import { AppHealthGetLanguagesHandler } from './handlers/app-health-get-languages.handler';
import { AppHealthFindLanguageByIdHandler } from './handlers/app-health-find-language-by-id.handler';
import { AppHealthFindLanguageHandler } from './handlers/app-health-find-language.handler';
import { AppHealthUpdateLanguageByIdHandler } from './handlers/app-health-update-language-by-id.handler';
import { AppHealthUpdateLanguagesHandler } from './handlers/app-health-update-languages.handler';
import { AppHealthUpsertLanguageHandler } from './handlers/app-health-upsert-language.handler';
import { AppHealthDeleteLanguageByIdHandler } from './handlers/app-health-delete-language-by-id.handler';
import { AppHealthDeleteLanguagesHandler } from './handlers/app-health-delete-languages.handler';

// seeder
import { AppHealthLanguageSeeder } from './seeder/app-health-language.seeder';

export const AppHealthLanguageControllers = [
    AppHealthCreateLanguageController,
    AppHealthCreateLanguagesController,
    AppHealthPaginateLanguagesController,
    AppHealthGetLanguagesController,
    AppHealthFindLanguageByIdController,
    AppHealthFindLanguageController,
    AppHealthUpdateLanguageByIdController,
    AppHealthUpdateLanguagesController,
    AppHealthUpsertLanguageController,
    AppHealthDeleteLanguageByIdController,
    AppHealthDeleteLanguagesController,
];

export const AppHealthLanguageResolvers = [
    AppHealthCreateLanguageResolver,
    AppHealthCreateLanguagesResolver,
    AppHealthPaginateLanguagesResolver,
    AppHealthGetLanguagesResolver,
    AppHealthFindLanguageByIdResolver,
    AppHealthFindLanguageResolver,
    AppHealthUpdateLanguageByIdResolver,
    AppHealthUpdateLanguagesResolver,
    AppHealthUpsertLanguageResolver,
    AppHealthDeleteLanguageByIdResolver,
    AppHealthDeleteLanguagesResolver,
];

export const AppHealthLanguageApiHandlers = [
    AppHealthCreateLanguageHandler,
    AppHealthCreateLanguagesHandler,
    AppHealthPaginateLanguagesHandler,
    AppHealthGetLanguagesHandler,
    AppHealthFindLanguageByIdHandler,
    AppHealthFindLanguageHandler,
    AppHealthUpdateLanguageByIdHandler,
    AppHealthUpdateLanguagesHandler,
    AppHealthUpsertLanguageHandler,
    AppHealthDeleteLanguageByIdHandler,
    AppHealthDeleteLanguagesHandler,
];

export const AppHealthLanguageServices = [
    AppHealthLanguageSeeder,
];
