import { Validator } from '../../validator/validator';
import { api } from '../api.client';
import { USERS_ROUTES } from '../../shared/constants/constants';
import {
  type UpdateUserRequest,
  UpdateProfileRequestSchema,
  type UpdateUserResponse,
  UpdateUserResponseSchema,
} from './user.schemas';

export class UserService {
  public static update = async (payload: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const validRequestPayload = Validator.zodParse(UpdateProfileRequestSchema, payload);
    const response = await api.patch(USERS_ROUTES.UPDATE, validRequestPayload);
    return Validator.zodParse(UpdateUserResponseSchema, response.data);
  };
}
