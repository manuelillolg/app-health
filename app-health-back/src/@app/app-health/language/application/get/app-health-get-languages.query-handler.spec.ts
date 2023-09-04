import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetLanguagesQueryHandler } from './app-health-get-languages.query-handler';
import { AppHealthMockLanguageRepository } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.repository';
import { AppHealthILanguageRepository } from '@app/app-health/language/domain/app-health-language.repository';
import { AppHealthLanguageMapper } from '@app/app-health/language/domain/app-health-language.mapper';
import { AppHealthGetLanguagesQuery } from './app-health-get-languages.query';
import { AppHealthGetLanguagesService } from './app-health-get-languages.service';

describe('GetLanguagesQueryHandler', () =>
{
    let queryHandler: AppHealthGetLanguagesQueryHandler;
    let service: AppHealthGetLanguagesService;
    let repository: AppHealthMockLanguageRepository;
    let mapper: AppHealthLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetLanguagesQueryHandler,
                {
                    provide : AppHealthILanguageRepository,
                    useClass: AppHealthMockLanguageRepository,
                },
                {
                    provide : AppHealthGetLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetLanguagesQueryHandler>(AppHealthGetLanguagesQueryHandler);
        service = module.get<AppHealthGetLanguagesService>(AppHealthGetLanguagesService);
        repository = <AppHealthMockLanguageRepository>module.get<AppHealthILanguageRepository>(AppHealthILanguageRepository);
        mapper = new AppHealthLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetLanguagesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an languages founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetLanguagesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});