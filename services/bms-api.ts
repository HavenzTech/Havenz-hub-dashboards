// services/bms-api.ts - BMS API Service for Havenz Hub
// Auto-aligned with backend Swagger spec

import type {
  // User types
  UserResponse,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UserResponsePagedResult,
  // Company types
  CompanyDto,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  CompanyDtoPagedResult,
  // Department types
  DepartmentDto,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  DepartmentDtoPagedResult,
  DepartmentMemberDto,
  AddDepartmentMemberRequest,
  // Project types
  ProjectDto,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectDtoPagedResult,
  ProjectMemberDto,
  ProjectDepartmentDto,
  AddProjectMemberRequest,
  // Task types
  TaskDto,
  // Property types
  PropertyDto,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyDtoPagedResult,
  // Document types
  DocumentDto,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  DocumentDtoPagedResult,
  DocumentActionResponse,
  FileUploadResponse,
  DocumentDownloadResponse,
  // Folder types
  FolderDto,
  CreateFolderRequest,
  UpdateFolderRequest,
  FolderDtoPagedResult,
  // BMS Device types
  BmsDeviceDto,
  CreateBmsDeviceRequest,
  UpdateBmsDeviceRequest,
  BmsDeviceDtoPagedResult,
  // Access Log types
  AccessLogDto,
  CreateAccessLogRequest,
  AccessLogDtoPagedResult,
  // IoT Metric types
  IotMetricDto,
  CreateIotMetricRequest,
  IotMetricDtoPagedResult,
  // Facial Recognition types
  FacialRecognitionDto,
  CreateFacialRecognitionRequest,
  UpdateFacialRecognitionRequest,
  FacialRecognitionDtoPagedResult,
  // Auth types
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ChangePasswordRequest,
  PasswordChangeResponse,
  EmailCheckResponse,
  // Member types
  MemberActionResponse,
  UpdateMemberRoleRequest,
} from '@/types/bms';

// ============================================
// Configuration
// ============================================

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_PREFIX = '/api/havenzhub';
const AUTH_PREFIX = '/api/auth';
const TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

// ============================================
// Error Handling
// ============================================

class BmsApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'BmsApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// ============================================
// Request Types
// ============================================

interface RequestOptions extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// ============================================
// Area Types (from Swagger)
// ============================================

interface AreaDto {
  id?: string;
  propertyId?: string;
  name?: string | null;
  areaType?: string | null;
  color?: string | null;
  floorLevel?: number;
  zoneCount?: number;
  squareFootage?: number | null;
  occupancyCapacity?: number | null;
  currentOccupancy?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  equipmentCount?: number;
  activeAlertsCount?: number;
  propertyName?: string | null;
}

interface AreaDetailDto extends AreaDto {
  equipment?: EquipmentSummaryDto[] | null;
}

interface CreateAreaRequest {
  name: string;
  areaType: string;
  color?: string | null;
  floorLevel?: number;
  zoneCount?: number;
  squareFootage?: number | null;
  occupancyCapacity?: number | null;
}

interface UpdateAreaRequest extends CreateAreaRequest {
  isActive?: boolean;
}

// ============================================
// Equipment Types (from Swagger)
// ============================================

interface EquipmentDto {
  id?: string;
  areaId?: string;
  name?: string | null;
  equipmentType?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  installDate?: string | null;
  warrantyExpiry?: string | null;
  status?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  areaName?: string | null;
  propertyName?: string | null;
  activeAlertsCount?: number;
}

interface EquipmentSummaryDto {
  id?: string;
  name?: string | null;
  equipmentType?: string | null;
  status?: string | null;
  activeAlertsCount?: number;
}

interface EquipmentDetailDto extends EquipmentDto {
  latestMetrics?: MetricValueDto[] | null;
}

interface CreateEquipmentRequest {
  name: string;
  equipmentType: string;
  manufacturer?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  installDate?: string | null;
  warrantyExpiry?: string | null;
  status?: string | null;
}

interface UpdateEquipmentRequest extends CreateEquipmentRequest {
  isActive?: boolean;
}

// ============================================
// Alert Types (from Swagger)
// ============================================

interface EquipmentAlertDto {
  id?: string;
  equipmentId?: string;
  alertType?: string | null;
  severity?: string | null;
  message?: string | null;
  value?: number | null;
  threshold?: number | null;
  status?: string | null;
  triggeredAt?: string;
  acknowledgedAt?: string | null;
  acknowledgedByUserId?: string | null;
  resolvedAt?: string | null;
  resolvedByUserId?: string | null;
  equipmentName?: string | null;
  areaName?: string | null;
  propertyName?: string | null;
}

interface AlertsResponse {
  alerts?: EquipmentAlertDto[] | null;
  totalCount?: number;
  activeCount?: number;
  acknowledgedCount?: number;
  resolvedCount?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

// ============================================
// Metric Types (from Swagger)
// ============================================

interface MetricValueDto {
  metricType?: string | null;
  value?: number;
  unit?: string | null;
  timestamp?: string;
  status?: string | null;
}

interface MetricHistoryDto {
  metricType?: string | null;
  unit?: string | null;
  values?: MetricDataPoint[] | null;
}

interface MetricDataPoint {
  timestamp?: string;
  value?: number;
}

interface RecordMetricRequest {
  metricType: string;
  value: number;
  unit?: string | null;
}

// ============================================
// Task Types (from Swagger) - Using imported TaskDto from @/types/bms
// ============================================

interface CreateTaskRequest {
  projectId: string;
  title: string;
  description?: string | null;
  priority?: string | null;
  dueDate?: string | null;
  assignedToUserId?: string | null;
}

interface UpdateTaskRequest {
  title: string;
  description?: string | null;
  status?: string | null;
  priority?: string | null;
  dueDate?: string | null;
  assignedToUserId?: string | null;
}

// ============================================
// Definition Types (from Swagger)
// ============================================

interface PropertyTypeDefinition {
  value?: string | null;
  label?: string | null;
  description?: string | null;
}

interface AreaTypeDefinition {
  value?: string | null;
  label?: string | null;
  description?: string | null;
  defaultColor?: string | null;
}

interface EquipmentTypeDefinition {
  value?: string | null;
  label?: string | null;
  category?: string | null;
}

interface MetricDefinition {
  metricType?: string | null;
  label?: string | null;
  unit?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  warningThreshold?: number | null;
  criticalThreshold?: number | null;
}

interface EquipmentTypeWithMetrics {
  equipmentType?: string | null;
  label?: string | null;
  category?: string | null;
  metrics?: MetricDefinition[] | null;
}

// ============================================
// Webhook Types (from Swagger)
// ============================================

interface IotMetricWebhookPayload {
  deviceId: string;
  propertyId: string;
  metrics: WebhookMetricData[];
  timestamp?: string;
}

interface WebhookMetricData {
  metricType: string;
  value: number;
  unit?: string | null;
}

// ============================================
// API Service Class
// ============================================

class BmsApiService {
  private baseUrl: string;
  private token: string | null = null;
  private companyId: string | null = null;

  constructor(baseUrl: string = BASE_URL!) {
    this.baseUrl = baseUrl;
  }

  // ============================================
  // Token Management
  // ============================================

  setToken(token: string) {
    this.token = token;
  }

  setCompanyId(companyId: string) {
    this.companyId = companyId;
  }

  clearToken() {
    this.token = null;
    this.companyId = null;
  }

  getToken(): string | null {
    return this.token;
  }

  getCompanyId(): string | null {
    return this.companyId;
  }

  // ============================================
  // Core Request Method
  // ============================================

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
    prefix: string = API_PREFIX
  ): Promise<T> {
    const { timeout = TIMEOUT, skipAuth = false, ...fetchOptions } = options;

    const url = `${this.baseUrl}${prefix}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((fetchOptions.headers as Record<string, string>) || {}),
    };

    if (!skipAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (!skipAuth && this.companyId) {
      headers['X-Company-Id'] = this.companyId;
    }

    // Debug logging
    console.log('[BMS API] Request:', {
      method: fetchOptions.method || 'GET',
      url,
      body: fetchOptions.body ? JSON.parse(fetchOptions.body as string) : null,
      headers: {
        ...headers,
        Authorization: headers['Authorization']
          ? `Bearer ${headers['Authorization'].substring(7, 27)}...`
          : 'none',
      },
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');
      const contentLength = response.headers.get('content-length');

      if (!response.ok) {
        const errorData = isJson
          ? await response.json()
          : { message: response.statusText };
        console.log('[BMS API] Error response:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new BmsApiError(
          errorData.message || 'API request failed',
          response.status,
          errorData.code,
          errorData.details
        );
      }

      console.log('[BMS API] Success response status:', response.status);

      // Handle empty responses
      if (contentLength === '0' || !isJson) {
        return undefined as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof BmsApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new BmsApiError('Request timeout', 408);
        }
        throw new BmsApiError(error.message, 500);
      }

      throw new BmsApiError('Unknown error occurred', 500);
    }
  }

  // ============================================
  // Generic HTTP Methods
  // ============================================

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // ============================================
  // FormData Upload Method
  // ============================================

  async postFormData<T>(
    endpoint: string,
    data: FormData,
    options?: RequestOptions
  ): Promise<T> {
    const { timeout = TIMEOUT, skipAuth = false, ...fetchOptions } = options || {};
    const url = `${this.baseUrl}${API_PREFIX}${endpoint}`;

    const headers: Record<string, string> = {};

    if (!skipAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (!skipAuth && this.companyId) {
      headers['X-Company-Id'] = this.companyId;
    }

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('FormData Upload:', { url });
      for (const [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        method: 'POST',
        headers,
        body: data,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 204) {
        return undefined as T;
      }

      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');

      if (!response.ok) {
        let errorData: { message?: string; title?: string; code?: string; details?: unknown; errors?: unknown } = {
          message: response.statusText,
        };
        try {
          if (isJson) {
            errorData = await response.json();
          } else {
            const errorText = await response.text();
            errorData = { message: errorText || response.statusText };
          }
        } catch {
          // Use default error
        }
        throw new BmsApiError(
          errorData.message || errorData.title || 'API request failed',
          response.status,
          errorData.code,
          errorData.details || errorData.errors
        );
      }

      return isJson ? await response.json() : (undefined as T);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof BmsApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new BmsApiError('Request timeout', 408);
        }
        throw new BmsApiError(error.message, 500);
      }

      throw new BmsApiError('Unknown error occurred', 500);
    }
  }

  // ============================================
  // Auth Endpoints - /api/auth
  // ============================================

  auth = {
    login: (data: LoginRequest): Promise<LoginResponse> =>
      this.request('/login', { method: 'POST', body: JSON.stringify(data) }, AUTH_PREFIX),

    register: (data: RegisterRequest): Promise<RegisterResponse> =>
      this.request('/register', { method: 'POST', body: JSON.stringify(data) }, AUTH_PREFIX),

    changePassword: (data: ChangePasswordRequest): Promise<PasswordChangeResponse> =>
      this.request('/change-password', { method: 'POST', body: JSON.stringify(data) }, AUTH_PREFIX),

    checkEmail: (email: string): Promise<EmailCheckResponse> =>
      this.request(`/check-email?email=${encodeURIComponent(email)}`, { method: 'GET' }, AUTH_PREFIX),
  };

  // ============================================
  // User Endpoints - /api/havenzhub/users
  // ============================================

  users = {
    getAll: (params?: PaginationParams): Promise<UserResponsePagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/users${query}`);
    },

    getById: (id: string): Promise<UserResponse> =>
      this.get(`/users/${id}`),

    create: (data: CreateUserRequest): Promise<CreateUserResponse> =>
      this.post('/users', data),

    update: (id: string, data: UpdateUserRequest): Promise<UserResponse> =>
      this.put(`/users/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/users/${id}`),

    uploadMyAvatar: (file: File): Promise<void> => {
      const formData = new FormData();
      formData.append('file', file);
      return this.postFormData('/users/me/avatar/upload', formData);
    },

    uploadAvatar: (id: string, file: File): Promise<void> => {
      const formData = new FormData();
      formData.append('file', file);
      return this.postFormData(`/users/${id}/avatar/upload`, formData);
    },
  };

  // ============================================
  // Company Endpoints - /api/havenzhub/companies
  // ============================================

  companies = {
    getAll: (params?: PaginationParams): Promise<CompanyDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/companies${query}`);
    },

    getById: (id: string): Promise<CompanyDto> =>
      this.get(`/companies/${id}`),

    create: (data: CreateCompanyRequest): Promise<CompanyDto> =>
      this.post('/companies', data),

    update: (id: string, data: UpdateCompanyRequest): Promise<CompanyDto> =>
      this.put(`/companies/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/companies/${id}`),

    getLogo: (id: string): Promise<string> =>
      this.get(`/companies/${id}/logo`),

    uploadLogo: (id: string, file: File): Promise<void> => {
      const formData = new FormData();
      formData.append('file', file);
      return this.postFormData(`/companies/${id}/logo/upload`, formData);
    },

    getStaff: (id: string): Promise<UserResponse[]> =>
      this.get(`/companies/${id}/staff`),
  };

  // ============================================
  // Department Endpoints - /api/havenzhub/departments
  // ============================================

  departments = {
    getAll: (params?: PaginationParams): Promise<DepartmentDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/departments${query}`);
    },

    getById: (id: string): Promise<DepartmentDto> =>
      this.get(`/departments/${id}`),

    create: (data: CreateDepartmentRequest): Promise<DepartmentDto> =>
      this.post('/departments', data),

    update: (id: string, data: UpdateDepartmentRequest): Promise<DepartmentDto> =>
      this.put(`/departments/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/departments/${id}`),

    // Member management
    getMembers: (departmentId: string): Promise<DepartmentMemberDto[]> =>
      this.get(`/departments/${departmentId}/members`),

    addMember: (departmentId: string, data: AddDepartmentMemberRequest): Promise<MemberActionResponse> =>
      this.post(`/departments/${departmentId}/members`, data),

    removeMember: (departmentId: string, userId: string): Promise<MemberActionResponse> =>
      this.delete(`/departments/${departmentId}/members/${userId}`),

    updateMemberRole: (departmentId: string, userId: string, data: UpdateMemberRoleRequest): Promise<MemberActionResponse> =>
      this.put(`/departments/${departmentId}/members/${userId}/role`, data),
  };

  // ============================================
  // Project Endpoints - /api/havenzhub/projects
  // ============================================

  projects = {
    getAll: (params?: PaginationParams): Promise<ProjectDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/projects${query}`);
    },

    getById: (id: string): Promise<ProjectDto> =>
      this.get(`/projects/${id}`),

    create: (data: CreateProjectRequest): Promise<ProjectDto> =>
      this.post('/projects', data),

    update: (id: string, data: UpdateProjectRequest): Promise<ProjectDto> =>
      this.put(`/projects/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/projects/${id}`),

    // Member management
    getMembers: (projectId: string): Promise<ProjectMemberDto[]> =>
      this.get(`/projects/${projectId}/members`),

    addMember: (projectId: string, data: AddProjectMemberRequest): Promise<MemberActionResponse> =>
      this.post(`/projects/${projectId}/members`, data),

    removeMember: (projectId: string, userId: string): Promise<MemberActionResponse> =>
      this.delete(`/projects/${projectId}/members/${userId}`),

    updateMemberRole: (projectId: string, userId: string, data: UpdateMemberRoleRequest): Promise<MemberActionResponse> =>
      this.put(`/projects/${projectId}/members/${userId}/role`, data),

    // Department assignments
    getDepartments: (projectId: string): Promise<ProjectDepartmentDto[]> =>
      this.get(`/projects/${projectId}/departments`),

    assignDepartment: (projectId: string, departmentId: string): Promise<void> =>
      this.post(`/projects/${projectId}/departments/${departmentId}`),

    removeDepartment: (projectId: string, departmentId: string): Promise<void> =>
      this.delete(`/projects/${projectId}/departments/${departmentId}`),
  };

  // ============================================
  // Property Endpoints - /api/havenzhub/properties
  // ============================================

  properties = {
    getAll: (params?: PaginationParams): Promise<PropertyDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/properties${query}`);
    },

    getById: (id: string): Promise<PropertyDto> =>
      this.get(`/properties/${id}`),

    create: (data: CreatePropertyRequest): Promise<PropertyDto> =>
      this.post('/properties', data),

    update: (id: string, data: UpdatePropertyRequest): Promise<PropertyDto> =>
      this.put(`/properties/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/properties/${id}`),

    // Alerts
    getAlerts: (propertyId: string, params?: PaginationParams & { status?: string; severity?: string }): Promise<AlertsResponse> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/properties/${propertyId}/alerts${query}`);
    },

    // Areas
    getAreas: (propertyId: string): Promise<AreaDto[]> =>
      this.get(`/properties/${propertyId}/areas`),

    getAreaById: (propertyId: string, areaId: string): Promise<AreaDetailDto> =>
      this.get(`/properties/${propertyId}/areas/${areaId}`),

    createArea: (propertyId: string, data: CreateAreaRequest): Promise<AreaDto> =>
      this.post(`/properties/${propertyId}/areas`, data),

    updateArea: (propertyId: string, areaId: string, data: UpdateAreaRequest): Promise<AreaDto> =>
      this.put(`/properties/${propertyId}/areas/${areaId}`, data),

    deleteArea: (propertyId: string, areaId: string): Promise<void> =>
      this.delete(`/properties/${propertyId}/areas/${areaId}`),
  };

  // ============================================
  // Area Equipment Endpoints - /api/havenzhub/areas/{areaId}/equipment
  // ============================================

  areas = {
    getEquipment: (areaId: string): Promise<EquipmentDto[]> =>
      this.get(`/areas/${areaId}/equipment`),

    createEquipment: (areaId: string, data: CreateEquipmentRequest): Promise<EquipmentDto> =>
      this.post(`/areas/${areaId}/equipment`, data),
  };

  // ============================================
  // Equipment Endpoints - /api/havenzhub/equipment
  // ============================================

  equipment = {
    getById: (id: string): Promise<EquipmentDetailDto> =>
      this.get(`/equipment/${id}`),

    update: (id: string, data: UpdateEquipmentRequest): Promise<EquipmentDto> =>
      this.put(`/equipment/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/equipment/${id}`),

    // Alerts
    getAlerts: (equipmentId: string, params?: PaginationParams & { status?: string }): Promise<AlertsResponse> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/equipment/${equipmentId}/alerts${query}`);
    },

    // Metrics
    getMetrics: (equipmentId: string): Promise<MetricValueDto[]> =>
      this.get(`/equipment/${equipmentId}/metrics`),

    recordMetric: (equipmentId: string, data: RecordMetricRequest): Promise<MetricValueDto> =>
      this.post(`/equipment/${equipmentId}/metrics`, data),

    getMetricHistory: (
      equipmentId: string,
      params?: { metricType?: string; startDate?: string; endDate?: string }
    ): Promise<MetricHistoryDto[]> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/equipment/${equipmentId}/metrics/history${query}`);
    },
  };

  // ============================================
  // Alert Endpoints - /api/havenzhub/alerts
  // ============================================

  alerts = {
    acknowledge: (id: string): Promise<EquipmentAlertDto> =>
      this.post(`/alerts/${id}/acknowledge`),

    resolve: (id: string): Promise<EquipmentAlertDto> =>
      this.post(`/alerts/${id}/resolve`),
  };

  // ============================================
  // Document Endpoints - /api/havenzhub/documents
  // ============================================

  documents = {
    getAll: (params?: PaginationParams): Promise<DocumentDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/documents${query}`);
    },

    getById: (id: string): Promise<DocumentDto> =>
      this.get(`/documents/${id}`),

    upload: (file: File): Promise<FileUploadResponse> => {
      const formData = new FormData();
      formData.append('file', file);
      return this.postFormData('/documents/upload', formData);
    },

    create: (data: CreateDocumentRequest): Promise<DocumentDto> =>
      this.post('/documents', data),

    update: (id: string, data: UpdateDocumentRequest): Promise<DocumentDto> =>
      this.put(`/documents/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/documents/${id}`),

    getDownloadUrl: (id: string): Promise<DocumentDownloadResponse> =>
      this.get(`/documents/${id}/download`),

    approve: (id: string): Promise<DocumentActionResponse> =>
      this.post(`/documents/${id}/approve`),

    reject: (id: string): Promise<DocumentActionResponse> =>
      this.post(`/documents/${id}/reject`),

    // User access
    getUsersWithAccess: (id: string): Promise<UserResponse[]> =>
      this.get(`/documents/${id}/users`),

    grantUserAccess: (id: string, userId: string, accessLevel?: string): Promise<void> => {
      const query = accessLevel ? `?accessLevel=${accessLevel}` : '';
      return this.post(`/documents/${id}/users/${userId}${query}`);
    },

    revokeUserAccess: (id: string, userId: string): Promise<void> =>
      this.delete(`/documents/${id}/users/${userId}`),

    // Department access
    getDepartments: (id: string): Promise<DepartmentDto[]> =>
      this.get(`/documents/${id}/departments`),

    assignDepartment: (id: string, departmentId: string): Promise<void> =>
      this.post(`/documents/${id}/departments/${departmentId}`),

    removeDepartment: (id: string, departmentId: string): Promise<void> =>
      this.delete(`/documents/${id}/departments/${departmentId}`),
  };

  // ============================================
  // Folder Endpoints - /api/havenzhub/folders
  // ============================================

  folders = {
    getAll: (params?: PaginationParams): Promise<FolderDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/folders${query}`);
    },

    getById: (id: string): Promise<FolderDto> =>
      this.get(`/folders/${id}`),

    getTree: (): Promise<FolderDto[]> =>
      this.get('/folders/tree'),

    getDocuments: (folderId: string): Promise<DocumentDto[]> =>
      this.get(`/folders/${folderId}/documents`),

    create: (data: CreateFolderRequest): Promise<FolderDto> =>
      this.post('/folders', data),

    update: (id: string, data: UpdateFolderRequest): Promise<FolderDto> =>
      this.put(`/folders/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/folders/${id}`),
  };

  // ============================================
  // BMS Device Endpoints - /api/havenzhub/BmsDevice
  // ============================================

  bmsDevices = {
    getAll: (params?: PaginationParams): Promise<BmsDeviceDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/BmsDevice${query}`);
    },

    getById: (id: string): Promise<BmsDeviceDto> =>
      this.get(`/BmsDevice/${id}`),

    getByProperty: (propertyId: string): Promise<BmsDeviceDto[]> =>
      this.get(`/BmsDevice/property/${propertyId}`),

    getByType: (type: string): Promise<BmsDeviceDto[]> =>
      this.get(`/BmsDevice/type/${type}`),

    getByStatus: (status: string): Promise<BmsDeviceDto[]> =>
      this.get(`/BmsDevice/status/${status}`),

    getByCompany: (companyId: string): Promise<BmsDeviceDto[]> =>
      this.get(`/BmsDevice/company/${companyId}`),

    getMaintenanceRequired: (): Promise<BmsDeviceDto[]> =>
      this.get('/BmsDevice/maintenance/required'),

    create: (data: CreateBmsDeviceRequest): Promise<BmsDeviceDto> =>
      this.post('/BmsDevice', data),

    update: (id: string, data: UpdateBmsDeviceRequest): Promise<BmsDeviceDto> =>
      this.put(`/BmsDevice/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/BmsDevice/${id}`),
  };

  // ============================================
  // Access Log Endpoints - /api/havenzhub/AccessLog
  // ============================================

  accessLogs = {
    getAll: (params?: PaginationParams & { accessType?: string; accessGranted?: boolean }): Promise<AccessLogDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/AccessLog${query}`);
    },

    getById: (id: number): Promise<AccessLogDto> =>
      this.get(`/AccessLog/${id}`),

    getByUser: (userId: string): Promise<AccessLogDto[]> =>
      this.get(`/AccessLog/user/${userId}`),

    getByProperty: (propertyId: string): Promise<AccessLogDto[]> =>
      this.get(`/AccessLog/property/${propertyId}`),

    getByDevice: (deviceId: string): Promise<AccessLogDto[]> =>
      this.get(`/AccessLog/device/${deviceId}`),

    getByCompany: (companyId: string): Promise<AccessLogDto[]> =>
      this.get(`/AccessLog/company/${companyId}`),

    getByType: (accessType: string): Promise<AccessLogDto[]> =>
      this.get(`/AccessLog/type/${accessType}`),

    getByDateRange: (startDate: string, endDate: string): Promise<AccessLogDto[]> =>
      this.get(`/AccessLog/daterange?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),

    getAnomalous: (): Promise<AccessLogDto[]> =>
      this.get('/AccessLog/anomalous'),

    getDenied: (): Promise<AccessLogDto[]> =>
      this.get('/AccessLog/denied'),

    create: (data: CreateAccessLogRequest): Promise<AccessLogDto> =>
      this.post('/AccessLog', data),

    delete: (id: number): Promise<void> =>
      this.delete(`/AccessLog/${id}`),
  };

  // ============================================
  // IoT Metric Endpoints - /api/havenzhub/IotMetric
  // ============================================

  iotMetrics = {
    getAll: (params?: PaginationParams): Promise<IotMetricDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/IotMetric${query}`);
    },

    getById: (id: number): Promise<IotMetricDto> =>
      this.get(`/IotMetric/${id}`),

    getByDevice: (deviceId: string): Promise<IotMetricDto[]> =>
      this.get(`/IotMetric/device/${deviceId}`),

    getByProperty: (propertyId: string): Promise<IotMetricDto[]> =>
      this.get(`/IotMetric/property/${propertyId}`),

    getByCompany: (companyId: string): Promise<IotMetricDto[]> =>
      this.get(`/IotMetric/company/${companyId}`),

    getByType: (metricType: string): Promise<IotMetricDto[]> =>
      this.get(`/IotMetric/type/${metricType}`),

    getByDateRange: (startDate: string, endDate: string): Promise<IotMetricDto[]> =>
      this.get(`/IotMetric/daterange?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),

    getAlerts: (): Promise<IotMetricDto[]> =>
      this.get('/IotMetric/alerts'),

    getBySeverity: (severity: string): Promise<IotMetricDto[]> =>
      this.get(`/IotMetric/severity/${severity}`),

    create: (data: CreateIotMetricRequest): Promise<IotMetricDto> =>
      this.post('/IotMetric', data),

    delete: (id: number): Promise<void> =>
      this.delete(`/IotMetric/${id}`),
  };

  // ============================================
  // Facial Recognition Endpoints - /api/havenzhub/FacialRecognition
  // ============================================

  facialRecognition = {
    getAll: (params?: PaginationParams): Promise<FacialRecognitionDtoPagedResult> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/FacialRecognition${query}`);
    },

    getById: (id: string): Promise<FacialRecognitionDto> =>
      this.get(`/FacialRecognition/${id}`),

    getByUser: (userId: string): Promise<FacialRecognitionDto[]> =>
      this.get(`/FacialRecognition/user/${userId}`),

    getByCompany: (companyId: string): Promise<FacialRecognitionDto[]> =>
      this.get(`/FacialRecognition/company/${companyId}`),

    getByStatus: (status: string): Promise<FacialRecognitionDto[]> =>
      this.get(`/FacialRecognition/status/${status}`),

    getExpired: (): Promise<FacialRecognitionDto[]> =>
      this.get('/FacialRecognition/expired'),

    create: (data: CreateFacialRecognitionRequest): Promise<FacialRecognitionDto> =>
      this.post('/FacialRecognition', data),

    update: (id: string, data: UpdateFacialRecognitionRequest): Promise<FacialRecognitionDto> =>
      this.put(`/FacialRecognition/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/FacialRecognition/${id}`),
  };

  // ============================================
  // Task Endpoints - /api/havenzhub/tasks
  // ============================================

  tasks = {
    getAll: (params?: PaginationParams): Promise<TaskDto[]> => {
      const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return this.get(`/tasks${query}`);
    },

    getById: (id: string): Promise<TaskDto> =>
      this.get(`/tasks/${id}`),

    getMyTasks: (): Promise<TaskDto[]> =>
      this.get('/tasks/my-tasks'),

    getByProject: (projectId: string): Promise<TaskDto[]> =>
      this.get(`/tasks/project/${projectId}`),

    create: (data: CreateTaskRequest): Promise<TaskDto> =>
      this.post('/tasks', data),

    update: (id: string, data: UpdateTaskRequest): Promise<TaskDto> =>
      this.put(`/tasks/${id}`, data),

    delete: (id: string): Promise<void> =>
      this.delete(`/tasks/${id}`),

    assign: (id: string, userId: string): Promise<TaskDto> =>
      this.post(`/tasks/${id}/assign/${userId}`),

    updateStatus: (id: string, status: string): Promise<TaskDto> =>
      this.put(`/tasks/${id}/status/${status}`),
  };

  // ============================================
  // Definition Endpoints - /api/havenzhub/definitions
  // ============================================

  definitions = {
    getPropertyTypes: (): Promise<PropertyTypeDefinition[]> =>
      this.get('/definitions/property-types'),

    getAreaTypes: (propertyType: string): Promise<AreaTypeDefinition[]> =>
      this.get(`/definitions/area-types/${propertyType}`),

    getEquipmentTypes: (propertyType: string): Promise<EquipmentTypeDefinition[]> =>
      this.get(`/definitions/equipment-types/${propertyType}`),

    getMetricDefinitions: (equipmentType: string): Promise<MetricDefinition[]> =>
      this.get(`/definitions/metric-definitions/${equipmentType}`),

    getEquipmentTypesWithMetrics: (): Promise<EquipmentTypeWithMetrics[]> =>
      this.get('/definitions/equipment-types-with-metrics'),
  };

  // ============================================
  // Webhook Endpoints - /api/havenzhub/webhooks
  // ============================================

  webhooks = {
    postIotMetrics: (data: IotMetricWebhookPayload): Promise<void> =>
      this.post('/webhooks/iot-metrics', data),

    health: (): Promise<{ status: string }> =>
      this.get('/webhooks/health'),
  };
}

// ============================================
// Export Singleton Instance
// ============================================

export const bmsApi = new BmsApiService();
export { BmsApiError };
export type {
  // Area types
  AreaDto,
  AreaDetailDto,
  CreateAreaRequest,
  UpdateAreaRequest,
  // Equipment types
  EquipmentDto,
  EquipmentSummaryDto,
  EquipmentDetailDto,
  CreateEquipmentRequest,
  UpdateEquipmentRequest,
  // Alert types
  EquipmentAlertDto,
  AlertsResponse,
  // Metric types
  MetricValueDto,
  MetricHistoryDto,
  MetricDataPoint,
  RecordMetricRequest,
  // Task types
  TaskDto,
  CreateTaskRequest,
  UpdateTaskRequest,
  // Definition types
  PropertyTypeDefinition,
  AreaTypeDefinition,
  EquipmentTypeDefinition,
  MetricDefinition,
  EquipmentTypeWithMetrics,
  // Webhook types
  IotMetricWebhookPayload,
  WebhookMetricData,
  // Request types
  RequestOptions,
  PaginationParams,
};
