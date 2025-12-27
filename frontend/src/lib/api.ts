const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Auth token management
export const authToken = {
  get: () => localStorage.getItem('auth_token'),
  set: (token: string) => localStorage.setItem('auth_token', token),
  remove: () => localStorage.removeItem('auth_token'),
};

// API request helper with auth
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = authToken.get();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const data = await apiRequest<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    authToken.set(data.token);
    return data;
  },

  register: async (email: string, password: string, name: string) => {
    const data = await apiRequest<{ token: string; user: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    authToken.set(data.token);
    return data;
  },

  logout: () => {
    authToken.remove();
  },

  me: () => apiRequest<{ user: any }>('/api/auth/me'),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest('/api/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// Portfolio API
export const portfolioApi = {
  // Get all portfolio data (public)
  getAll: () => apiRequest<any>('/api/portfolio'),

  // Admin endpoints
  admin: {
    // Hero
    getHero: () => apiRequest<any>('/api/portfolio/admin/hero'),
    updateHero: (data: any) =>
      apiRequest('/api/portfolio/admin/hero', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    // Projects
    getProjects: () => apiRequest<any[]>('/api/portfolio/admin/projects'),
    createProject: (data: any) =>
      apiRequest('/api/portfolio/admin/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateProject: (id: string, data: any) =>
      apiRequest(`/api/portfolio/admin/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteProject: (id: string) =>
      apiRequest(`/api/portfolio/admin/projects/${id}`, {
        method: 'DELETE',
      }),

    // Experiences
    getExperiences: () => apiRequest<any[]>('/api/portfolio/admin/experiences'),
    createExperience: (data: any) =>
      apiRequest('/api/portfolio/admin/experiences', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateExperience: (id: string, data: any) =>
      apiRequest(`/api/portfolio/admin/experiences/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteExperience: (id: string) =>
      apiRequest(`/api/portfolio/admin/experiences/${id}`, {
        method: 'DELETE',
      }),

    // Skills
    getSkills: () => apiRequest<any[]>('/api/portfolio/admin/skills'),
    createSkill: (data: any) =>
      apiRequest('/api/portfolio/admin/skills', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateSkill: (id: string, data: any) =>
      apiRequest(`/api/portfolio/admin/skills/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteSkill: (id: string) =>
      apiRequest(`/api/portfolio/admin/skills/${id}`, {
        method: 'DELETE',
      }),

    // Testimonials
    getTestimonials: () => apiRequest<any[]>('/api/portfolio/admin/testimonials'),
    createTestimonial: (data: any) =>
      apiRequest('/api/portfolio/admin/testimonials', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateTestimonial: (id: string, data: any) =>
      apiRequest(`/api/portfolio/admin/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteTestimonial: (id: string) =>
      apiRequest(`/api/portfolio/admin/testimonials/${id}`, {
        method: 'DELETE',
      }),

    // Contact
    getContact: () => apiRequest<any>('/api/portfolio/admin/contact'),
    updateContact: (data: any) =>
      apiRequest('/api/portfolio/admin/contact', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    // Education
    getEducation: () => apiRequest<any[]>('/api/portfolio/admin/education'),
    createEducation: (data: any) =>
      apiRequest('/api/portfolio/admin/education', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateEducation: (id: string, data: any) =>
      apiRequest(`/api/portfolio/admin/education/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteEducation: (id: string) =>
      apiRequest(`/api/portfolio/admin/education/${id}`, {
        method: 'DELETE',
      }),

    // Certifications
    getCertifications: () => apiRequest<any[]>('/api/portfolio/admin/certifications'),
    createCertification: (data: any) =>
      apiRequest('/api/portfolio/admin/certifications', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateCertification: (id: string, data: any) =>
      apiRequest(`/api/portfolio/admin/certifications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteCertification: (id: string) =>
      apiRequest(`/api/portfolio/admin/certifications/${id}`, {
        method: 'DELETE',
      }),
  },
};

// Health check
export const healthCheck = () => apiRequest<{ status: string; timestamp: string }>('/api/health');
