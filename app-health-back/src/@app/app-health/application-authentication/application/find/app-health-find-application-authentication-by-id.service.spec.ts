import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthFindApplicationAuthenticationByIdService } from './app-health-find-application-authentication-by-id.service';
import { AppHealthApplicationAuthenticationId } from '../../domain/value-objects';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthMockApplicationAuthenticationRepository } from '../../infrastructure/mock/app-health-mock-application-authentication.repository';

describe('AppHealthFindApplicationAuthenticationByIdService', () =>
{
    let service: AppHealthFindApplicationAuthenticationByIdService;
    let repository: AppHealthIApplicationAuthenticationRepository;
    let mockRepository: AppHealthMockApplicationAuthenticationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationAuthenticationByIdService,
                AppHealthMockApplicationAuthenticationRepository,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationAuthenticationByIdService);
        repository = module.get(AppHealthIApplicationAuthenticationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthenticationRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationAuthenticationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationAuthentication by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApplicationAuthenticationId(appHealthMockApplicationAuthenticationData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
