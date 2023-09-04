import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockLanguageRepository } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.repository';
import { AppHealthILanguageRepository } from '@app/app-health/language/domain/app-health-language.repository';
import { AppHealthLanguageMapper } from '@app/app-health/language/domain/app-health-language.mapper';
import { AppHealthRawSQLLanguagesQueryHandler } from './app-health-raw-sql-languages.query-handler';
import { AppHealthRawSQLLanguagesQuery } from './app-health-raw-sql-languages.query';
import { AppHealthRawSQLLanguagesService } from './app-health-raw-sql-languages.service';

describe('RawSQLLanguagesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLLanguagesQueryHandler;
    let service: AppHealthRawSQLLanguagesService;
    let repository: AppHealthMockLanguageRepository;
    let mapper: AppHealthLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLLanguagesQueryHandler,
                {
                    provide : AppHealthILanguageRepository,
                    useClass: AppHealthMockLanguageRepository,
                },
                {
                    provide : AppHealthRawSQLLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLLanguagesQueryHandler>(AppHealthRawSQLLanguagesQueryHandler);
        service = module.get<AppHealthRawSQLLanguagesService>(AppHealthRawSQLLanguagesService);
        repository = <AppHealthMockLanguageRepository>module.get<AppHealthILanguageRepository>(AppHealthILanguageRepository);
        mapper = new AppHealthLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLLanguagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an languages founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLLanguagesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
