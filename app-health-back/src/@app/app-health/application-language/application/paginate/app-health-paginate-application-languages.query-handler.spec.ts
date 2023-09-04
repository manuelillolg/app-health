import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationLanguagesQueryHandler } from './app-health-paginate-application-languages.query-handler';
import { AppHealthMockApplicationLanguageRepository } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.repository';
import { AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language/domain/app-health-application-language.repository';
import { AppHealthApplicationLanguageMapper } from '@app/app-health/application-language/domain/app-health-application-language.mapper';
import { AppHealthPaginateApplicationLanguagesQuery } from './app-health-paginate-application-languages.query';
import { AppHealthPaginateApplicationLanguagesService } from './app-health-paginate-application-languages.service';

describe('AppHealthPaginateApplicationLanguagesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationLanguagesQueryHandler;
    let service: AppHealthPaginateApplicationLanguagesService;
    let repository: AppHealthMockApplicationLanguageRepository;
    let mapper: AppHealthApplicationLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationLanguagesQueryHandler,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useClass: AppHealthMockApplicationLanguageRepository,
                },
                {
                    provide : AppHealthPaginateApplicationLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationLanguagesQueryHandler>(AppHealthPaginateApplicationLanguagesQueryHandler);
        service = module.get<AppHealthPaginateApplicationLanguagesService>(AppHealthPaginateApplicationLanguagesService);
        repository = <AppHealthMockApplicationLanguageRepository>module.get<AppHealthIApplicationLanguageRepository>(AppHealthIApplicationLanguageRepository);
        mapper = new AppHealthApplicationLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationLanguagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationLanguages paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationLanguagesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
