export const ID = {
  name: 'id',
  required: true,
  description: 'Id of the document',
  example: '60e0a6e1e9d5f7c1b8e5d7a4',
  type: String,
};

export const ATTENDANCE_DATE = {
  name: 'attendance_date',
  required: false,
  description: 'Attendance date',
  example: '2021-07-01',
  type: String,
};

export const PAGE = {
  name: 'page',
  required: false,
  description: 'page number',
  example: 1,
  type: Number,
};
