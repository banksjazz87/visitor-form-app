export interface SQLResponse {
    code: string;
    sqlMessage: string;
  }
  
  export interface DBAttendee {
    firstName: string;
    lastName: string;
    age: string;
    memberType: string;
    active: number;
    id: number;
  }

  export interface ProcessEnv {
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_HOST: string;
    MYSQL_DATABASE: string;
    GENERAL_ATTENDANCE: string;
  }