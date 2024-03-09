interface User {
  userName: string;
  name: string;
  email: string;
  lastLogin?: Date;
  userType: 'System' | 'Client';
  url: string;
  createdDate?: Date;
  lastEditDate?: Date;
  clientId: string;
  id: number;
}

interface Response {
  statusCode: number;
  totalItems: number;
  success: boolean;
  message: string | null;
  data: any;
}

interface Coordinate {
  latitude: number;
  longitude: number;
  id: number;
}
