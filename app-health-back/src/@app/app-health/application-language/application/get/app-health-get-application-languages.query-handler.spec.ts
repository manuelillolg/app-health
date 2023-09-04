import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationLanguagesQueryHandler } from './app-health-get-application-languages.query-handler';
import { AppHealthMockApplicationLanguageRepository } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.repository';
import { AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language/domain/app-health-application-language.repository';
import { AppHealthApplicationLanguageMapper } from '@app/app-health/application-language/domain/app-health-application-language.mapper';
import { AppHealthGetApplicationLanguagesQuery } from './app-health-get-application-languages.query';
import { AppHealthGetApplicationLanguagesService } from './app-health-get-application-languages.service';

describe('GetApplicationLanguagesQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationLanguagesQueryHandler;
    let service: AppHealthGetApplicationLanguagesService;
    let repository: AppHealthMockApplicationLanguageRepository;
    let mapper: AppHealthApplicationLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationLanguagesQueryHandler,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useClass: AppHealthMockApplicationLanguageRepository,
                },
                {
                    provide : AppHealthGetApplicationLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationLanguagesQueryHandler>(AppHealthGetApplicationLanguagesQueryHandler);
        service = module.get<AppHealthGetApplicationLanguagesService>(AppHealthGetApplicationLanguagesService);
        repository = <AppHealthMockApplicationLanguageRepository>module.get<AppHealthIApplicationLanguageRepository>(AppHealthIApplicationLanguageRepository);
        mapper = new AppHealthApplicationLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationLanguagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationLanguages founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationLanguagesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});