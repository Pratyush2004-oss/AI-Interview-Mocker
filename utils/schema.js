import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview",{
    id:serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobExperience: varchar('jobExperiience').notNull(),
    jobPosition: varchar("jobPosition").notNull(),
    jobDesc: varchar("jobDesc").notNull(),
    createdBy: varchar("CreatedBy").notNull(),
    createdAt: varchar("CreatedAt"),
    mockId: varchar("mockId").notNull()
})