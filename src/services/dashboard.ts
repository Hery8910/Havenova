import api from "./api";


// ----- CALENDAR -----

// Crea un nuevo calendario (año)
export const createCalendar = async (calendarData: any): Promise<any> => {
  try {
    const response = await api.post('/api/dashboard/calendar', calendarData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualiza parcialmente un calendario existente para un año
export const updateCalendar = async (year: number, updateData: any): Promise<any> => {
  try {
    const response = await api.patch(`/api/dashboard/calendar/${year}`, updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtiene el calendario de un año específico (guest)
export const getCalendarGuest = async (year: number): Promise<any> => {
  try {
    const response = await api.get(`/api/dashboard/calendar/guest/${year}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtiene el calendario de un año específico (admin)
export const getCalendarAdmin = async (year: number): Promise<any> => {
  try {
    const response = await api.get(`/api/dashboard/calendar/${year}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ----- WORKER MANAGEMENT -----

// Crea un nuevo trabajador
export const createWorker = async (workerData: any): Promise<any> => {
  try {
    const response = await api.post('/api/dashboard/workers', workerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualiza un trabajador (por ID)
export const updateWorker = async (workerId: string, updateData: any): Promise<any> => {
  try {
    const response = await api.patch(`/api/dashboard/workers/${workerId}`, updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Elimina un trabajador
export const deleteWorker = async (workerId: string): Promise<any> => {
  try {
    const response = await api.delete(`/api/dashboard/workers/${workerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtiene todos los trabajadores de un cliente (filtrando por clientId)
export const getWorkers = async (clientId: string): Promise<any> => {
  try {
    const response = await api.get(`/api/dashboard/workers?clientId=${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ----- TASK / SCHEDULE MANAGEMENT -----

// Asigna una nueva tarea (solicitud) a un trabajador
export const assignTask = async (taskData: any): Promise<any> => {
  try {
    const response = await api.post('/api/dashboard/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualiza una tarea existente (por ID)
export const updateTask = async (taskId: string, updateData: any): Promise<any> => {
  try {
    const response = await api.patch(`/api/dashboard/tasks/${taskId}`, updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtiene todas las tareas para un cliente (filtrando por clientId)
export const getTasks = async (clientId: string): Promise<any> => {
  try {
    const response = await api.get(`/api/dashboard/tasks?clientId=${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
