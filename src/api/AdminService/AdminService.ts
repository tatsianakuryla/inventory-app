import { Validator } from '../../validator/validator';
import { api } from '../api.client';
import { ADMIN_ROUTES } from '../api.requestRoutes';
import {
  type GetUsersResponse,
  GetUsersResponseSchema,
  type UsersQuery,
  UsersQuerySchema,
  type UpdateUsersRequest,
  UpdateUsersRequestSchema,
  type UpdateUsersResponse,
  UpdateUsersResponseSchema,
  type DeleteUsersRequest,
  DeleteUsersRequestSchema,
  type DeleteUsersResponse,
  DeleteUsersResponseSchema,
  type UserListItem,
  UserListItemSchema,
} from './admin.schemas';

export class AdminService {
  public static getUsers = async (query: UsersQuery = {}): Promise<GetUsersResponse> => {
    const validQuery = Validator.zodParse(UsersQuerySchema, query);
    const response = await api.get(ADMIN_ROUTES.GET_ALL_USERS, { params: validQuery });
    return Validator.zodParse(GetUsersResponseSchema, response.data);
  };

  public static getUserById = async (userId: string): Promise<UserListItem> => {
    const response = await api.get(`${ADMIN_ROUTES.GET_ALL_USERS}/${userId}`);
    return Validator.zodParse(UserListItemSchema, response.data);
  };

  public static blockUsers = async (payload: UpdateUsersRequest): Promise<UpdateUsersResponse> => {
    const validPayload = Validator.zodParse(UpdateUsersRequestSchema, payload);
    const response = await api.post(ADMIN_ROUTES.BLOCK_USERS, validPayload);
    return Validator.zodParse(UpdateUsersResponseSchema, response.data);
  };

  public static unblockUsers = async (
    payload: UpdateUsersRequest
  ): Promise<UpdateUsersResponse> => {
    const validPayload = Validator.zodParse(UpdateUsersRequestSchema, payload);
    const response = await api.post(ADMIN_ROUTES.UNBLOCK_USERS, validPayload);
    return Validator.zodParse(UpdateUsersResponseSchema, response.data);
  };

  public static promoteUsers = async (
    payload: UpdateUsersRequest
  ): Promise<UpdateUsersResponse> => {
    const validPayload = Validator.zodParse(UpdateUsersRequestSchema, payload);
    const response = await api.post(ADMIN_ROUTES.PROMOTE_USERS, validPayload);
    return Validator.zodParse(UpdateUsersResponseSchema, response.data);
  };

  public static demoteUsers = async (payload: UpdateUsersRequest): Promise<UpdateUsersResponse> => {
    const validPayload = Validator.zodParse(UpdateUsersRequestSchema, payload);
    const response = await api.post(ADMIN_ROUTES.DEMOTE_USERS, validPayload);
    return Validator.zodParse(UpdateUsersResponseSchema, response.data);
  };

  public static deleteUsers = async (payload: DeleteUsersRequest): Promise<DeleteUsersResponse> => {
    const validPayload = Validator.zodParse(DeleteUsersRequestSchema, payload);
    const response = await api.delete(ADMIN_ROUTES.DELETE_USERS, { data: validPayload });
    return Validator.zodParse(DeleteUsersResponseSchema, response.data);
  };
}
