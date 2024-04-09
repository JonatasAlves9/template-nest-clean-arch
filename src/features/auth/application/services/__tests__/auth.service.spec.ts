import { SignInUseCase } from '../../usecases/signin.usecase';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let signInUseCase: jest.Mocked<SignInUseCase>;

  beforeEach(() => {
    // Criar um stub para o SignInUseCase
    signInUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<SignInUseCase>;

    // Inicializar o AuthService com o stub do SignInUseCase
    authService = new AuthService(signInUseCase);
  });

  describe('signIn', () => {
    it('should call SignInUseCase.execute with provided cpf and password', async () => {
      // Arrange
      const cpf = '72265344010';
      const password = 'testpassword';

      // Act
      await authService.signIn(cpf, password);

      // Assert
      expect(signInUseCase.execute).toHaveBeenCalledWith(cpf, password);
    });

    it('should return the result from SignInUseCase', async () => {
      // Arrange
      const expectedResult = {};
      signInUseCase.execute.mockResolvedValue(expectedResult);

      // Act
      const result = await authService.signIn('testuser', 'testpassword');

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
