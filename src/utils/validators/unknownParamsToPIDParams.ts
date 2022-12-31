import { ParsedUrlQuery } from "querystring";
import { z } from "zod";

export const pidSchema = z.object({
  pid: z.string(),
});

export const unknownParamsToPIDParams = (
  params: ParsedUrlQuery | undefined
): false | string => {
  const result = pidSchema.safeParse(params);
  return result.success ? result.data.pid : false;
};
