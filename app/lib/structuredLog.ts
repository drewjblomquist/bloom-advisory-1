type LogStatus = "success" | "failure";

type LogEvent = {
  requestId: string;
  eventName: string;
  status: LogStatus;
  durationMs: number;
  errorCode?: string;
};

export const writeSubmissionLog = (event: LogEvent) => {
  console.info(JSON.stringify(event));
};
