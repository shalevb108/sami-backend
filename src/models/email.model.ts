import { z } from "zod";

export const EmailSchema = z.object({
  attendanceNotes: z.string(),
  cash: z.boolean(),
  cashCancellation: z.boolean(),
  clubMember :z.boolean(),
  employeeAttendance:z.boolean(),
  employeeNotes: z.string(),
  envelopes:z.boolean(),
  safe:z.boolean(),
  smallRegister:z.boolean(),
  envelopesInDay:z.boolean(),
  folder:z.boolean(),
  keys:z.boolean(),
  otherDocuments:z.boolean(),
  redemption:z.boolean(),
  register:z.boolean(),
  registerNotes: z.string(),
  safeNotes: z.string(),
  stockNotes: z.string(),
  unloadedDocuments:z.boolean(),
  unusualAmounts:z.boolean(),
  warehouseStock:z.boolean(),
});

export type Email = z.infer<typeof EmailSchema>;
