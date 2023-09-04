import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationApisQueryHandler } from './app-health-get-application-apis.query-handler';
import { AppHealthMockApplicationApiRepository } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.repository';
import { AppHealthIApplicationApiRepository } from '@app/app-health/application-api/domain/app-health-application-api.repository';
import { AppHealthApplicationApiMapper } from '@app/app-health/application-api/domain/app-health-application-api.mapper';
import { AppHealthGetApplicationApisQuery } from './app-health-get-application-apis.query';
import { AppHealthGetApplicationApisService } from './app-health-get-application-apis.service';

describe('GetApplicationApisQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationApisQueryHandler;
    let service: AppHealthGetApplicationApisService;
    let repository: AppHealthMockApplicationApiRepository;
    let mapper: AppHealthApplicationApiMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationApisQueryHandler,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useClass: AppHealthMockApplicationApiRepository,
                },
                {
                    provide : AppHealthGetApplicationApisService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationApisQueryHandler>(AppHealthGetApplicationApisQueryHandler);
        service = module.get<AppHealthGetApplicationApisService>(AppHealthGetApplicationApisService);
        repository = <AppHealthMockApplicationApiRepository>module.get<AppHealthIApplicationApiRepository>(AppHealthIApplicationApiRepository);
        mapper = new AppHealthApplicationApiMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationApisQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationApis founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationApisQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});