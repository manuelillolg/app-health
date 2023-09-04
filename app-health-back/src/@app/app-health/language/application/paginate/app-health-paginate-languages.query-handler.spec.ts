import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateLanguagesQueryHandler } from './app-health-paginate-languages.query-handler';
import { AppHealthMockLanguageRepository } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.repository';
import { AppHealthILanguageRepository } from '@app/app-health/language/domain/app-health-language.repository';
import { AppHealthLanguageMapper } from '@app/app-health/language/domain/app-health-language.mapper';
import { AppHealthPaginateLanguagesQuery } from './app-health-paginate-languages.query';
import { AppHealthPaginateLanguagesService } from './app-health-paginate-languages.service';

describe('AppHealthPaginateLanguagesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateLanguagesQueryHandler;
    let service: AppHealthPaginateLanguagesService;
    let repository: AppHealthMockLanguageRepository;
    let mapper: AppHealthLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateLanguagesQueryHandler,
                {
                    provide : AppHealthILanguageRepository,
                    useClass: AppHealthMockLanguageRepository,
                },
                {
                    provide : AppHealthPaginateLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateLanguagesQueryHandler>(AppHealthPaginateLanguagesQueryHandler);
        service = module.get<AppHealthPaginateLanguagesService>(AppHealthPaginateLanguagesService);
        repository = <AppHealthMockLanguageRepository>module.get<AppHealthILanguageRepository>(AppHealthILanguageRepository);
        mapper = new AppHealthLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateLanguagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an languages paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateLanguagesQuery(
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
