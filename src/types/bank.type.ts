enum MaritalStatus {
  Single = "single",
  Married = "married",
  Divorced = "divorced",
  Unknown = "unknown",
}

enum DefaultStatus {
  Yes = "yes",
  No = "no",
  Unknown = "unknown",
}

enum HousingStatus {
  Yes = "yes",
  No = "no",
  Unknown = "unknown",
}

enum LoanStatus {
  Yes = "yes",
  No = "no",
  Unknown = "unknown",
}

enum ContactMethod {
  Cellular = "cellular",
  Telephone = "telephone",
}

enum Month {
  Jan = "jan",
  Feb = "feb",
  Mar = "mar",
  Apr = "apr",
  May = "may",
  Jun = "jun",
  Jul = "jul",
  Aug = "aug",
  Sep = "sep",
  Oct = "oct",
  Nov = "nov",
  Dec = "dec",
}

enum DayOfWeek {
  Mon = "mon",
  Tue = "tue",
  Wed = "wed",
  Thu = "thu",
  Fri = "fri",
}

enum POutcome {
  Success = "success",
  Failure = "failure",
  Nonexistent = "nonexistent",
}

enum TargetStatus {
  Yes = "yes",
  No = "no",
  Unknown = "unknown",
}

export type Bank = {
  age: number;
  job: string;
  marital: MaritalStatus;
  education: string;
  default: DefaultStatus;
  housing: HousingStatus;
  loan: LoanStatus;
  contact: ContactMethod;
  month: Month;
  day_of_week: DayOfWeek;
  duration: number;
  campaign: number;
  pdays: number;
  previous: number;
  poutcome: POutcome;
  emp_var_rate: number;
  cons_price_idx: number;
  cons_conf_idx: number;
  euribor3m: number;
  nr_employed: number;
  y: TargetStatus;
};
