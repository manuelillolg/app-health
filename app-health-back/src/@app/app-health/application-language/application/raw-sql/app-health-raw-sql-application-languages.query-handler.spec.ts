import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationLanguageRepository } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.repository';
import { AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language/domain/app-health-application-language.repository';
import { AppHealthApplicationLanguageMapper } from '@app/app-health/application-language/domain/app-health-application-language.mapper';
import { AppHealthRawSQLApplicationLanguagesQueryHandler } from './app-health-raw-sql-application-languages.query-handler';
import { AppHealthRawSQLApplicationLanguagesQuery } from './app-health-raw-sql-application-languages.query';
import { AppHealthRawSQLApplicationLanguagesService } from './app-health-raw-sql-application-languages.service';

describe('RawSQLApplicationLanguagesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationLanguagesQueryHandler;
    let service: AppHealthRawSQLApplicationLanguagesService;
    let repository: AppHealthMockApplicationLanguageRepository;
    let mapper: AppHealthApplicationLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationLanguagesQueryHandler,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useClass: AppHealthMockApplicationLanguageRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationLanguagesQueryHandler>(AppHealthRawSQLApplicationLanguagesQueryHandler);
        service = module.get<AppHealthRawSQLApplicationLanguagesService>(AppHealthRawSQLApplicationLanguagesService);
        repository = <AppHealthMockApplicationLanguageRepository>module.get<AppHealthIApplicationLanguageRepository>(AppHealthIApplicationLanguageRepository);
        mapper = new AppHealthApplicationLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationLanguagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationLanguages founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationLanguagesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
