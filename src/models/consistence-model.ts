export interface ConsistenceDay {
  date: string;
  hasLog: boolean;
}

export interface Consistence {
  consistenceDays: number;
  lastWeekDays: ConsistenceDay[];
}
